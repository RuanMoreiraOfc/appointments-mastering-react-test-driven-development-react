import { act } from 'react-dom/test-utils';
import ReactTestUtils from 'react-dom/test-utils';

import { createContainer } from './utils/domManipulators';

import { CustomerForm } from '../src/CustomerForm';

const createSpy = () => {
  let receivedArguments;
  let returnValue;

  return {
    get: (n) => receivedArguments[n],
    getAll: () => receivedArguments,
    stubReturnValue: (value) => (returnValue = value),
    set: (...args) => (receivedArguments = args) && returnValue,
  };
};

const fetchResponseOk = (body) =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(body),
  });

const fetchResponseError = () => Promise.resolve({ ok: false });

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

  const originalFetch = window.fetch;
  let globalFetchSpy;
  beforeEach(() => {
    globalFetchSpy = createSpy();
    window.fetch = globalFetchSpy.set;

    const fetchResponse = fetchResponseOk({});
    globalFetchSpy.stubReturnValue(fetchResponse);
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

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
      const component = <CustomerForm {...{ [fieldName]: value }} />;
      const { container, render } = createContainer();

      render(component);
      const form = getFormFrom(container)('customer');
      ReactTestUtils.Simulate.submit(form);

      const fetchOptions = globalFetchSpy.get(1);
      expect(JSON.parse(fetchOptions.body)[fieldName]).toEqual(value);
    });
  };

  const itSubmitsNewValue = (fieldName) => (newValue) => {
    it('saves new value when submitted', () => {
      const component = <CustomerForm {...{ [fieldName]: 'value' }} />;
      const { container, render } = createContainer();

      render(component);
      const field = getCustomerFormFieldFrom(container)(fieldName);
      const form = field.form;
      ReactTestUtils.Simulate.change(field, {
        target: { value: newValue },
      });
      ReactTestUtils.Simulate.submit(form);

      const fetchOptions = globalFetchSpy.get(1);
      expect(JSON.parse(fetchOptions.body)[fieldName]).toEqual(newValue);
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

  it('calls fetch with the right properties when submitting data', () => {
    const component = <CustomerForm />;
    const { container, render } = createContainer();

    render(component);
    const form = getFormFrom(container)('customer');
    ReactTestUtils.Simulate.submit(form);
    expect(globalFetchSpy).toHaveBeenCalled();
    expect(globalFetchSpy.get(0)).toEqual('/customers');

    const fetchConfig = globalFetchSpy.get(1);
    expect(fetchConfig.method).toEqual('POST');
    expect(fetchConfig.credentials).toEqual('same-origin');
    expect(fetchConfig.headers).toEqual({
      'Content-Type': 'application/json',
    });
  });

  it('notifies onSave when form is submitted', async () => {
    const saveSpy = createSpy();

    // ***

    const customer = { id: 123 };
    const fetchResponse = fetchResponseOk(customer);
    globalFetchSpy.stubReturnValue(fetchResponse);

    const component = <CustomerForm onSave={saveSpy.set} />;
    const { container, render } = createContainer();

    render(component);
    const form = getFormFrom(container)('customer');
    await act(async () => {
      ReactTestUtils.Simulate.submit(form);
    });

    expect(saveSpy).toHaveBeenCalled();
    expect(saveSpy.get(0)).toEqual(customer);
  });

  it('does not notify onSave if the POST request returns an error', async () => {
    const saveSpy = createSpy();

    // ***

    const fetchResponse = fetchResponseError();
    globalFetchSpy.stubReturnValue(fetchResponse);

    const component = <CustomerForm onSave={saveSpy.set} />;
    const { container, render } = createContainer();

    render(component);
    const form = getFormFrom(container)('customer');
    await act(async () => {
      ReactTestUtils.Simulate.submit(form);
    });

    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('prevents the default action when submitting the form', async () => {
    const preventDefaultSpy = createSpy();

    const component = <CustomerForm />;
    const { container, render } = createContainer();

    render(component);
    const form = getFormFrom(container)('customer');
    await act(async () => {
      ReactTestUtils.Simulate.submit(form, {
        preventDefault: preventDefaultSpy.set,
      });
    });

    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});
