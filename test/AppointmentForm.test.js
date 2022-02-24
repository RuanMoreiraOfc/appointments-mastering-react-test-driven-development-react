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

  const getStartsAtList = (container) =>
    container.querySelectorAll(`input[name="startsAt"]`);

  it('renders a form', () => {
    const component = <AppointmentForm />;
    const { container, render } = createContainer();

    render(component);

    const form = getFormFrom(container)('appointment');
    expect(form).not.toBeNull();
  });

  // #region GENERIC USE CASES

  const itRendersAsASelectBox = (fieldName) => {
    it('renders as a select box', () => {
      const component = <AppointmentForm />;
      const { container, render } = createContainer();

      render(component);

      const field = getAppointmentFormFieldFrom(container)(fieldName);
      expect(field).toBeTruthy();
      expect(field.tagName).toEqual('SELECT');
    });
  };

  const itInitiallyHasABlankValueChosen = (fieldName) => {
    it('initially has a blank value chosen', () => {
      const component = <AppointmentForm />;
      const { container, render } = createContainer();

      render(component);

      const field = getAppointmentFormFieldFrom(container)(fieldName);
      const firstNode = field.childNodes[0];
      expect(firstNode).toBeTruthy();
      expect(firstNode.value).toEqual('');
      expect(firstNode.selected).toBeTruthy();
    });
  };

  const itListAllOptions = (fieldName) => (listProperty) => {
    it('lists all options', () => {
      const options = ['A', 'B'];
      const component = <AppointmentForm {...{ [listProperty]: options }} />;
      const { container, render } = createContainer();

      render(component);

      const field = getAppointmentFormFieldFrom(container)(fieldName);
      const optionNodes = Array.from(field.childNodes);
      const renderedServices = optionNodes.map((node) => node.textContent);
      expect(renderedServices).toEqual(expect.arrayContaining(options));
    });
  };

  const itPreSelectsExistingValue = (fieldName) => (listProperty) => {
    it('pre-selects the existing value', () => {
      const options = ['A'];
      const component = (
        <AppointmentForm
          {...{
            [listProperty]: options, //
            [fieldName]: 'A',
          }}
        />
      );
      const { container, render } = createContainer();

      render(component);

      const field = getAppointmentFormFieldFrom(container)(fieldName);
      const option = findOptionFrom(field)('A');
      expect(option.selected).toBeTruthy();
    });
  };

  const itRendersALabel = (fieldName) => (labelText) => {
    it('renders a label', () => {
      const component = <AppointmentForm />;
      const { container, render } = createContainer();

      render(component);

      const label = getLabelFrom(container)(fieldName);
      expect(label).not.toBeNull();
      expect(label.textContent).toEqual(labelText);
    });
  };

  const itAssignsAnIdThatMatchesTheLabelId = (fieldName) => {
    it('assigns an id that matches the label', () => {
      const component = <AppointmentForm />;
      const { container, render } = createContainer();

      render(component);

      const field = getAppointmentFormFieldFrom(container)(fieldName);
      expect(field.id).toEqual(fieldName);
    });
  };

  const itSubmitsExistingValue = (fieldName) => (listProperty) => {
    it('saves existing value when submitted', () => {
      const options = ['A', 'B'];
      const component = (
        <AppointmentForm
          {...{
            [listProperty]: options, //
            [fieldName]: 'A',
          }}
          onSubmit={(props) => expect(props[fieldName]).toEqual('A')}
        />
      );
      const { container, render } = createContainer();

      render(component);
      const form = getFormFrom(container)('appointment');
      ReactTestUtils.Simulate.submit(form);

      expect.hasAssertions();
    });
  };

  const itSubmitsNewValue = (fieldName) => (listProperty) => {
    it('saves new value when submitted', () => {
      const options = ['A', 'B'];
      const component = (
        <AppointmentForm
          {...{
            [listProperty]: options, //
            [fieldName]: 'A',
          }}
          onSubmit={(props) => expect(props[fieldName]).toEqual('B')}
        />
      );
      const { container, render } = createContainer();

      render(component);
      const field = getAppointmentFormFieldFrom(container)(fieldName);
      const form = field.form;
      ReactTestUtils.Simulate.change(field, {
        target: { value: 'B' },
      });
      ReactTestUtils.Simulate.submit(form);

      expect.hasAssertions();
    });
  };

  // #endregion

  describe('service field', () => {
    itRendersAsASelectBox('service');
    itInitiallyHasABlankValueChosen('service');
    itListAllOptions('service')('selectableServices');
    itPreSelectsExistingValue('service')('selectableServices');
    itRendersALabel('service')('Service');
    itAssignsAnIdThatMatchesTheLabelId('service');
    itSubmitsExistingValue('service')('selectableServices');
    itSubmitsNewValue('service')('selectableServices');
  });

  describe('stylist field', () => {
    itRendersAsASelectBox('stylist');
    itInitiallyHasABlankValueChosen('stylist');
    itListAllOptions('stylist')('selectableStylists');
    itPreSelectsExistingValue('stylist')('selectableStylists');
    itRendersALabel('stylist')('Stylist');
    itAssignsAnIdThatMatchesTheLabelId('stylist');
    itSubmitsExistingValue('stylist')('selectableStylists');
    itSubmitsNewValue('stylist')('selectableStylists');

    it('does not render stylist options when default service makes it unavailable', () => {
      const selectableServices = ['1', '2'];
      const selectableStylists = ['A', 'B'];
      const stylistsByService = {
        1: ['B'],
        2: ['A', 'B'],
      };
      const component = (
        <AppointmentForm
          selectableServices={selectableServices}
          service='1'
          selectableStylists={selectableStylists}
          stylistsByService={stylistsByService}
        />
      );
      const { container, render } = createContainer();

      render(component);

      const field = getAppointmentFormFieldFrom(container)('stylist');
      expect(field.childNodes).toHaveLength(2);
    });

    it('does not render stylist options when current service makes it unavailable', () => {
      const selectableServices = ['1', '2'];
      const selectableStylists = ['A', 'B'];
      const stylistsByService = {
        1: ['B'],
        2: ['A', 'B'],
      };
      const component = (
        <AppointmentForm
          selectableServices={selectableServices}
          service='1'
          selectableStylists={selectableStylists}
          stylistsByService={stylistsByService}
        />
      );
      const { container, render } = createContainer();

      render(component);
      const serviceField = getAppointmentFormFieldFrom(container)('service');
      ReactTestUtils.Simulate.change(serviceField, {
        target: { value: '2' },
      });

      const stylistField = getAppointmentFormFieldFrom(container)('stylist');
      expect(stylistField.childNodes).toHaveLength(3);
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

    it('renders a radio button for each time slot', () => {
      const today = new Date();
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0) },
        { startsAt: today.setHours(9, 30, 0, 0) },
      ];
      const component = (
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
        />
      );
      const { container, render } = createContainer();

      render(component);

      const table = getTimeSlotTable(container);
      const cells = table.querySelectorAll('td');
      expect(cells).not.toHaveLength(0);
      expect(cells[0].querySelector('input[type="radio"]')).not.toBeNull();
      expect(cells[7].querySelector('input[type="radio"]')).not.toBeNull();
    });

    it('does not render radio buttons for unavailable time slots', () => {
      const component = <AppointmentForm availableTimeSlots={[]} />;
      const { container, render } = createContainer();

      render(component);

      const table = getTimeSlotTable(container);
      const timesOfDay = table.querySelectorAll('input');
      expect(timesOfDay).toHaveLength(0);
    });

    it('sets radio button values to the index of the corresponding appointment', () => {
      const today = new Date();
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0) },
        { startsAt: today.setHours(9, 30, 0, 0) },
      ];
      const component = (
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
        />
      );
      const { container, render } = createContainer();

      render(component);

      const fields = getStartsAtList(container);
      expect(fields[0].value).toEqual(
        availableTimeSlots[0].startsAt.toString(),
      );
      expect(fields[1].value).toEqual(
        availableTimeSlots[1].startsAt.toString(),
      );
    });

    it('includes the existing value', () => {
      const today = new Date();
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0) },
        { startsAt: today.setHours(9, 30, 0, 0) },
      ];
      const component = (
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
          startsAt={availableTimeSlots[0].startsAt}
        />
      );
      const { container, render } = createContainer();

      render(component);

      const fields = getStartsAtList(container);
      expect(fields[0]).toBeTruthy();
      expect(fields[0].defaultChecked).toEqual(true);
    });

    it('saves new value when submitted', () => {
      const today = new Date();
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0) },
        { startsAt: today.setHours(9, 30, 0, 0) },
      ];
      const component = (
        <AppointmentForm
          availableTimeSlots={availableTimeSlots}
          today={today}
          startsAt={availableTimeSlots[0].startsAt}
          onSubmit={({ startsAt }) => {
            expect(startsAt).toEqual(availableTimeSlots[1].startsAt);
            const fields = getStartsAtList(container);
            expect(fields[0].checked).toEqual(false);
          }}
        />
      );
      const { container, render } = createContainer();

      render(component);
      const fields = getStartsAtList(container);
      ReactTestUtils.Simulate.change(fields[1], {
        target: {
          value: String(availableTimeSlots[1].startsAt),
        },
      });
      const form = getFormFrom(container)('appointment');
      ReactTestUtils.Simulate.submit(form);

      expect.hasAssertions();
    });

    it('does not render time slots when default stylist makes it unavailable', () => {
      const selectableStylists = ['A', 'B'];
      const today = new Date();
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0), availableStylists: ['B'] },
        {
          startsAt: today.setHours(9, 30, 0, 0),
          availableStylists: ['A', 'B'],
        },
      ];
      const component = (
        <AppointmentForm
          selectableStylists={selectableStylists}
          stylist='A'
          availableTimeSlots={availableTimeSlots}
        />
      );
      const { container, render } = createContainer();

      render(component);

      const fields = getStartsAtList(container);
      expect(fields).toHaveLength(1);
    });

    it('does not render time slots when current stylist makes it unavailable', () => {
      const selectableStylists = ['A', 'B'];
      const today = new Date();
      const availableTimeSlots = [
        { startsAt: today.setHours(9, 0, 0, 0), availableStylists: ['B'] },
        {
          startsAt: today.setHours(9, 30, 0, 0),
          availableStylists: ['A', 'B'],
        },
      ];
      const component = (
        <AppointmentForm
          selectableStylists={selectableStylists}
          stylist='A'
          availableTimeSlots={availableTimeSlots}
        />
      );
      const { container, render } = createContainer();
      render(component);
      const stylistField = getAppointmentFormFieldFrom(container)('stylist');
      ReactTestUtils.Simulate.change(stylistField, {
        target: { value: 'B' },
      });

      const fields = getStartsAtList(container);
      expect(fields).toHaveLength(2);
    });
  });
});
