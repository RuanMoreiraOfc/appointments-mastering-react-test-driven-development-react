import { act } from 'react-dom/test-utils';
import ReactTestUtils from 'react-dom/test-utils';

import { createContainer } from './utils/domManipulators';

import { CustomerForm } from '../src/CustomerForm';

const getFetchResponseOk = (body) =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(body),
  });

const getFetchResponseError = () => Promise.resolve({ ok: false });

const getFetchRequestBody = (fetchSpy) =>
  JSON.parse(fetchSpy.mock.calls[0][1].body);

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
    const fetchResponse = getFetchResponseOk({});
    globalFetchSpy = jest.fn(() => fetchResponse);
    window.fetch = globalFetchSpy;
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
      const defaultFields = { [fieldName]: value };
      const component = <CustomerForm {...defaultFields} />;
      const { container, render } = createContainer();

      render(component);
      const form = getFormFrom(container)('customer');
      ReactTestUtils.Simulate.submit(form);

      const body = getFetchRequestBody(globalFetchSpy);
      expect(body).toMatchObject(defaultFields);
    });
  };

  const itSubmitsNewValue = (fieldName) => (newValue) => {
    it('saves new value when submitted', () => {
      const defaultFields = { [fieldName]: 'value' };
      const atEndFields = { [fieldName]: newValue };
      const component = <CustomerForm {...defaultFields} />;
      const { container, render } = createContainer();

      render(component);
      const field = getCustomerFormFieldFrom(container)(fieldName);
      const form = field.form;
      ReactTestUtils.Simulate.change(field, {
        target: { value: newValue },
      });
      ReactTestUtils.Simulate.submit(form);

      const body = getFetchRequestBody(globalFetchSpy);
      expect(body).toMatchObject(atEndFields);
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
    expect(globalFetchSpy).toHaveBeenCalledWith(
      '/customers',
      expect.objectContaining({
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    );
  });

  it('notifies onSave when form is submitted', async () => {
    const saveSpy = jest.fn();

    // ***

    const customer = { id: 123 };
    const fetchResponse = getFetchResponseOk(customer);
    globalFetchSpy.mockReturnValue(fetchResponse);

    const component = <CustomerForm onSave={saveSpy} />;
    const { container, render } = createContainer();

    render(component);
    const form = getFormFrom(container)('customer');
    await act(async () => {
      ReactTestUtils.Simulate.submit(form);
    });

    expect(saveSpy).toHaveBeenCalledWith(customer);
  });

  it('does not notify onSave if the POST request returns an error', async () => {
    const saveSpy = jest.fn();

    // ***

    const fetchResponse = getFetchResponseError();
    globalFetchSpy.mockReturnValue(fetchResponse);

    const component = <CustomerForm onSave={saveSpy} />;
    const { container, render } = createContainer();

    render(component);
    const form = getFormFrom(container)('customer');
    await act(async () => {
      ReactTestUtils.Simulate.submit(form);
    });

    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('prevents the default action when submitting the form', async () => {
    const preventDefaultSpy = jest.fn();

    const component = <CustomerForm />;
    const { container, render } = createContainer();

    render(component);
    const form = getFormFrom(container)('customer');
    await act(async () => {
      ReactTestUtils.Simulate.submit(form, {
        preventDefault: preventDefaultSpy,
      });
    });

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('renders error message when fetch call fails', async () => {
    const fetchResponse = getFetchResponseError();
    globalFetchSpy.mockReturnValue(fetchResponse);

    const component = <CustomerForm />;
    const { container, render } = createContainer();

    render(component);
    const form = getFormFrom(container)('customer');
    await act(async () => {
      ReactTestUtils.Simulate.submit(form);
    });

    const errorElement = container.querySelector('.error');
    expect(errorElement).not.toBeNull();
    expect(errorElement.textContent).toMatch('error occurred');
  });
});
