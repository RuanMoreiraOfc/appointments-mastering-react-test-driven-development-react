import { createContainer } from './utils/domManipulators';

import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  const getFormFrom = (container) => (id) =>
    container.querySelector(`form[id="${id}"]`);

  it('renders a form', () => {
    const component = <CustomerForm />;
    const { container, render } = createContainer();

    render(component);

    const form = getFormFrom(container)('customer');
    expect(form).not.toBeNull();
  });

  it('renders the first name field as a text box', () => {
    const component = <CustomerForm />;
    const { container, render } = createContainer();

    render(component);

    const form = getFormFrom(container)('customer');
    const field = form.elements.firstName;
    expect(field).toBeTruthy();
    expect(field.tagName).toEqual('INPUT');
    expect(field.type).toEqual('text');
  });
});
