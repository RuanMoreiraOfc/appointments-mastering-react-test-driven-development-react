import ReactTestUtils from 'react-dom/test-utils';

import { createContainer } from './utils/domManipulators';

import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  const getFormFrom = (container) => (id) =>
    container.querySelector(`form[id="${id}"]`);

  const getCustomerFormFieldFrom = (container) => (field) =>
    getFormFrom(container)('customer').elements[field];

  const getLabelFrom = (container) => (fieldId) =>
    container.querySelector(`label[for="${fieldId}"]`);

  it('renders a form', () => {
    const component = <CustomerForm />;
    const { container, render } = createContainer();

    render(component);

    const form = getFormFrom(container)('customer');
    expect(form).not.toBeNull();
  });

  const expectToBeInputFieldOfTypeText = (field) => {
    expect(field).toBeTruthy();
    expect(field.tagName).toEqual('INPUT');
    expect(field.type).toEqual('text');
  };

  it('renders the first name field as a text box', () => {
    const component = <CustomerForm />;
    const { container, render } = createContainer();

    render(component);

    const field = getCustomerFormFieldFrom(container)('firstName');
    expectToBeInputFieldOfTypeText(field);
  });

  it('includes the existing value for the first name', () => {
    const firstName = 'Ashley';
    const component = <CustomerForm firstName={firstName} />;
    const { container, render } = createContainer();

    render(component);

    const field = getCustomerFormFieldFrom(container)('firstName');
    expect(field.defaultValue).toEqual('Ashley');
  });

  it('renders a label for the first name field', () => {
    const component = <CustomerForm />;
    const { container, render } = createContainer();

    render(component);

    const label = getLabelFrom(container)('firstName');
    expect(label).not.toBeNull();
    expect(label.textContent).toEqual('First name');
  });

  it('assigns an id that matches the label id to the first name field', () => {
    const component = <CustomerForm />;
    const { container, render } = createContainer();

    render(component);

    const field = getCustomerFormFieldFrom(container)('firstName');
    expect(field.id).toEqual('firstName');
  });
});
