import ReactTestUtils from 'react-dom/test-utils';

import { createContainer } from './utils/domManipulators';

import { CustomerForm } from '../src/CustomerForm';

const createSpy = () => {
  let receivedArguments;

  return {
    get: (n) => receivedArguments[n],
    getAll: () => receivedArguments,
    set: (...args) => (receivedArguments = args),
  };
};

expect.extend({
  toHaveBeenCalled(received) {
    if (received.getAll() === undefined) {
      return {
        pass: false,
        message: () => 'Spy was not called.',
      };
    }
    return { pass: true, message: () => 'Spy was called.' };
  },
});

describe('Helper: `toHaveBeenCalled`', () => {
  it('pass', () => {
    const spy = createSpy();

    spy.set('anything');

    expect(spy.getAll()).not.toEqual(undefined);
  });

  it('fail', () => {
    const spy = createSpy();

    expect(spy.getAll()).toEqual(undefined);
  });
});

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
    const spy = createSpy();

    it('saves existing value when submitted', () => {
      const component = (
        <CustomerForm {...{ [fieldName]: value }} onSubmit={spy.set} />
      );
      const { container, render } = createContainer();

      render(component);
      const form = getFormFrom(container)('customer');
      ReactTestUtils.Simulate.submit(form);

      expect(spy).toHaveBeenCalled();
      expect(spy.get(0)[fieldName]).toEqual(value);
    });
  };

  const itSubmitsNewValue = (fieldName) => (newValue) => {
    const spy = createSpy();

    it('saves new value when submitted', () => {
      const component = (
        <CustomerForm {...{ [fieldName]: 'value' }} onSubmit={spy.set} />
      );
      const { container, render } = createContainer();

      render(component);
      const field = getCustomerFormFieldFrom(container)(fieldName);
      const form = field.form;
      ReactTestUtils.Simulate.change(field, {
        target: { value: newValue },
      });
      ReactTestUtils.Simulate.submit(form);

      expect(spy).toHaveBeenCalled();
      expect(spy.get(0)[fieldName]).toEqual(newValue);
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
    itSubmitsNewValue('lastName')('anotherLastName');
  });

  describe('phone number field', () => {
    itRendersAsATextBox('phoneNumber');
    itIncludesTheExistingValue('phoneNumber');
    itRendersALabel('phoneNumber')('Phone number');
    itAssignsAnIdThatMatchesTheLabelId('phoneNumber');
    itSubmitsExistingValue('phoneNumber')('phoneNumber');
    itSubmitsNewValue('phoneNumber')('anotherPhoneNumber');
  });

  it('has a submit button', () => {
    const component = <CustomerForm />;
    const { container, render } = createContainer();

    render(component);

    const submitButton = container.querySelector('input[type="submit"]');
    expect(submitButton).not.toBeNull();
  });
});
