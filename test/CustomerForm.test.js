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

  // #region GENERIC USE CASES

  const expectToBeInputFieldOfTypeText = (field) => {
    expect(field).toBeTruthy();
    expect(field.tagName).toEqual('INPUT');
    expect(field.type).toEqual('text');
  };

  const itRendersAsATextBox = (fieldName) => {
    it('renders field as a text box', () => {
      const component = <CustomerForm />;
      const { container, render } = createContainer();

      render(component);

      const field = getCustomerFormFieldFrom(container)(fieldName);
      expectToBeInputFieldOfTypeText(field);
    });
  };

  const itIncludesTheExistingValue = (fieldName) => {
    it('includes the existing value', () => {
      const component = <CustomerForm {...{ [fieldName]: 'value' }} />;
      const { container, render } = createContainer();

      render(component);

      const field = getCustomerFormFieldFrom(container)(fieldName);
      expect(field.defaultValue).toEqual('value');
    });
  };

  const itRendersALabel = (fieldName) => (labelContent) => {
    it('renders a label for the field', () => {
      const component = <CustomerForm />;
      const { container, render } = createContainer();

      render(component);

      const label = getLabelFrom(container)(fieldName);
      expect(label).not.toBeNull();
      expect(label.textContent).toEqual(labelContent);
    });
  };

  const itAssignsAnIdThatMatchesTheLabelId = (fieldName) => {
    it('assigns an id that matches the label', () => {
      const component = <CustomerForm />;
      const { container, render } = createContainer();

      render(component);

      const field = getCustomerFormFieldFrom(container)(fieldName);
      expect(field.id).toEqual(fieldName);
    });
  };

  const itSubmitsExistingValue = (fieldName) => (value) => {
    it('saves existing value when submitted', () => {
      const component = (
        <CustomerForm
          {...{ [fieldName]: value }}
          onSubmit={(props) => expect(props[fieldName]).toEqual(value)}
        />
      );
      const { container, render } = createContainer();

      render(component);
      const form = getFormFrom(container)('customer');
      ReactTestUtils.Simulate.submit(form);

      expect.hasAssertions();
    });
  };

  const itSubmitsNewValue = (fieldName) => (newValue) => {
    it('saves new value when submitted', () => {
      const component = (
        <CustomerForm
          {...{ [fieldName]: 'value' }}
          onSubmit={(props) => expect(props[fieldName]).toEqual(newValue)}
        />
      );
      const { container, render } = createContainer();

      render(component);
      const field = getCustomerFormFieldFrom(container)(fieldName);
      const form = field.form;
      ReactTestUtils.Simulate.change(field, {
        target: { value: newValue },
      });
      ReactTestUtils.Simulate.submit(form);

      expect.hasAssertions();
    });
  };

  // #endregion

  describe('first name field', () => {
    itRendersAsATextBox('firstName');
    itIncludesTheExistingValue('firstName');
    itRendersALabel('firstName')('First name');
    itAssignsAnIdThatMatchesTheLabelId('firstName');
    itSubmitsExistingValue('firstName')('firstName');
    itSubmitsNewValue('firstName')('anotherFirstName');
  });

  describe('last name field', () => {
    itRendersAsATextBox('lastName');
    itIncludesTheExistingValue('lastName');
    itRendersALabel('lastName')('Last name');
    itAssignsAnIdThatMatchesTheLabelId('lastName');
    itSubmitsExistingValue('lastName')('lastName');
  });
});
