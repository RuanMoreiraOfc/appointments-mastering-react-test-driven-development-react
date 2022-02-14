import ReactTestUtils from 'react-dom/test-utils';

import { createContainer } from './utils/domManipulators';

import { AppointmentForm } from '../src/AppointmentForm';

describe('AppointmentForm', () => {
  const getFormFrom = (container) => (id) =>
    container.querySelector(`form[id="${id}"]`);

  const getAppointmentFormFieldFrom = (container) => (field) =>
    getFormFrom(container)('appointment').elements[field];

  const findOptionFrom = (dropdownNode) => (textContent) => {
    const options = Array.from(dropdownNode.childNodes);
    return options.find((option) => option.textContent === textContent);
  };

  const getLabelFrom = (container) => (fieldId) =>
    container.querySelector(`label[for="${fieldId}"]`);

  const getTimeSlotTable = (container) =>
    container.querySelector('table#time-slots');

  it('renders a form', () => {
    const component = <AppointmentForm />;
    const { container, render } = createContainer();

    render(component);

    const form = getFormFrom(container)('appointment');
    expect(form).not.toBeNull();
  });

  describe('service field', () => {
    it('renders as a select box', () => {
      const component = <AppointmentForm />;
      const { container, render } = createContainer();

      render(component);

      const field = getAppointmentFormFieldFrom(container)('service');
      expect(field).toBeTruthy();
      expect(field.tagName).toEqual('SELECT');
    });

    it('initially has a blank value chosen', () => {
      const component = <AppointmentForm />;
      const { container, render } = createContainer();

      render(component);

      const field = getAppointmentFormFieldFrom(container)('service');
      const firstNode = field.childNodes[0];
      expect(firstNode).toBeTruthy();
      expect(firstNode.value).toEqual('');
      expect(firstNode.selected).toBeTruthy();
    });

    it('lists all salon services', () => {
      const selectableServices = ['Cut', 'Blow-dry'];
      const component = (
        <AppointmentForm selectableServices={selectableServices} />
      );
      const { container, render } = createContainer();

      render(component);

      const field = getAppointmentFormFieldFrom(container)('service');
      const optionNodes = Array.from(field.childNodes);
      const renderedServices = optionNodes.map((node) => node.textContent);
      expect(renderedServices).toEqual(
        expect.arrayContaining(selectableServices),
      );
    });

    it('pre-selects the existing value', () => {
      const selectableServices = ['Cut', 'Blow-dry'];
      const component = (
        <AppointmentForm
          selectableServices={selectableServices}
          service='Blow-dry'
        />
      );
      const { container, render } = createContainer();

      render(component);

      const field = getAppointmentFormFieldFrom(container)('service');
      const option = findOptionFrom(field)('Blow-dry');
      expect(option.selected).toBeTruthy();
    });

    it('renders a label', () => {
      const component = <AppointmentForm />;
      const { container, render } = createContainer();

      render(component);

      const label = getLabelFrom(container)('service');
      expect(label).not.toBeNull();
      expect(label.textContent).toEqual('Service');
    });

    it('assigns an id that matches the label', () => {
      const component = <AppointmentForm />;
      const { container, render } = createContainer();

      render(component);

      const field = getAppointmentFormFieldFrom(container)('service');
      expect(field.id).toEqual('service');
    });

    it('saves existing value when submitted', () => {
      const selectableServices = ['Cut', 'Blow-dry'];
      const component = (
        <AppointmentForm
          selectableServices={selectableServices}
          service='Cut'
          onSubmit={({ service }) => expect(service).toEqual('Cut')}
        />
      );
      const { container, render } = createContainer();

      render(component);
      const form = getFormFrom(container)('appointment');
      ReactTestUtils.Simulate.submit(form);

      expect.hasAssertions();
    });

    it('saves new value when submitted', () => {
      const selectableServices = ['Cut', 'Blow-dry'];
      const component = (
        <AppointmentForm
          selectableServices={selectableServices}
          service='Cut'
          onSubmit={({ service }) => expect(service).toEqual('Blow-dry')}
        />
      );
      const { container, render } = createContainer();

      render(component);
      const field = getAppointmentFormFieldFrom(container)('service');
      const form = field.form;
      ReactTestUtils.Simulate.change(field, {
        target: { value: 'Blow-dry' },
      });
      ReactTestUtils.Simulate.submit(form);

      expect.hasAssertions();
    });
  });

  describe('time slot table', () => {
    it('renders a table for time slots', () => {
      const component = <AppointmentForm />;
      const { container, render } = createContainer();

      render(component);

      const table = getTimeSlotTable(container);
      expect(table).not.toBeNull();
    });

    it('renders a time slot for every half an hour between open and close times', () => {
      const component = <AppointmentForm salonOpensAt={9} salonClosesAt={11} />;
      const { container, render } = createContainer();

      render(component);

      const table = getTimeSlotTable(container);
      const timesOfDay = table.querySelectorAll('tbody th');
      expect(timesOfDay).toHaveLength(4);
      expect(timesOfDay[0].textContent).toEqual('09:00');
      expect(timesOfDay[1].textContent).toEqual('09:30');
      expect(timesOfDay[3].textContent).toEqual('10:30');
    });

    it('renders an empty cell at the start of the header row', () => {
      const component = <AppointmentForm />;
      const { container, render } = createContainer();

      render(component);

      const table = getTimeSlotTable(container);
      const headerRow = table.querySelector('thead > tr');
      expect(headerRow).not.toBeNull();
      expect(headerRow.firstChild).not.toBeNull();
      expect(headerRow.firstChild.textContent).toEqual('');
    });

    it('renders a week of available dates', () => {
      const today = new Date(2022, 2, 13);
      const component = <AppointmentForm today={today} />;
      const { container, render } = createContainer();

      render(component);

      const table = getTimeSlotTable(container);
      const dates = table.querySelectorAll('thead th:not(:first-child)');
      expect(dates).toHaveLength(7);
      expect(dates[0].textContent).toEqual('Sun 13');
      expect(dates[1].textContent).toEqual('Mon 14');
      expect(dates[6].textContent).toEqual('Sat 19');
    });
  });
});
