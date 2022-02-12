import { createContainer } from './utils/domManipulators';

import { AppointmentForm } from '../src/AppointmentForm';

describe('AppointmentForm', () => {
  const getFormFrom = (container) => (id) =>
    container.querySelector(`form[id="${id}"]`);

  const getAppointmentFormFieldFrom = (container) => (field) =>
    getFormFrom(container)('appointment').elements[field];

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
  });
});
