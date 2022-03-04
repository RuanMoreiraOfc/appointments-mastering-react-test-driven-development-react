// INFO: create a simple mock instead of {import 'whatwg-fetch'};

window.fetch = () => {};

import { createContainer } from './utils/domManipulators';
import {
  getFetchResponseOk,
  getFetchResponseError,
  getRequestBodyOf,
} from './utils/spyHelpers';

import { CustomerForm } from '../src/CustomerForm';

describe('CustomerForm', () => {
  const thisFormId = 'customer';

  beforeEach(() => {
    const fetchResponse = getFetchResponseOk({});
    jest.spyOn(window, 'fetch').mockReturnValue(fetchResponse);
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('renders a form', () => {
    const component = <CustomerForm />;
    const { render, query } = createContainer();

    render(component);

    const { formElement } = query({ formId: thisFormId });
    expect(formElement).not.toBeNull();
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
      const { render, query } = createContainer();

      render(component);

      const { fieldElement } = query({ formId: thisFormId, field: fieldName });
      expectToBeInputFieldOfTypeText(fieldElement);
    });
  };

  const itIncludesTheExistingValue = (fieldName) => {
    it('includes the existing value', () => {
      const component = <CustomerForm {...{ [fieldName]: 'value' }} />;
      const { render, query } = createContainer();

      render(component);

      const { fieldElement } = query({ formId: thisFormId, field: fieldName });
      expect(fieldElement.defaultValue).toEqual('value');
    });
  };

  const itRendersALabel = (fieldName) => (labelContent) => {
    it('renders a label for the field', () => {
      const component = <CustomerForm />;
      const { render, query } = createContainer();

      render(component);

      const { labelElement } = query({ formId: thisFormId, field: fieldName });
      expect(labelElement).not.toBeNull();
      expect(labelElement.textContent).toEqual(labelContent);
    });
  };

  const itAssignsAnIdThatMatchesTheLabelId = (fieldId) => {
    it('assigns an id that matches the label', () => {
      const component = <CustomerForm />;
      const { render, query } = createContainer();

      render(component);

      const { fieldElement } = query({ formId: thisFormId, field: fieldId });
      expect(fieldElement.id).toEqual(fieldId);
    });
  };

  const itSubmitsExistingValue = (fieldName) => (value) => {
    it('saves existing value when submitted', () => {
      const defaultFields = { [fieldName]: value };
      const component = <CustomerForm {...defaultFields} />;
      const { render, interact } = createContainer();

      render(component);
      interact({ formId: thisFormId }).interactiveForm.submit();

      const body = getRequestBodyOf(window.fetch);
      expect(body).toMatchObject(defaultFields);
    });
  };

  const itSubmitsNewValue = (fieldName) => (newValue) => {
    it('saves new value when submitted', () => {
      const defaultFields = { [fieldName]: 'value' };
      const atEndFields = { [fieldName]: newValue };
      const component = <CustomerForm {...defaultFields} />;
      const { render, interact } = createContainer();

      render(component);
      const { interactiveField, interactiveForm } = interact({
        formId: thisFormId,
        field: fieldName,
      });
      interactiveField.change({ target: { value: newValue } });
      interactiveForm.submit();

      const body = getRequestBodyOf(window.fetch);
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
    const { render, query } = createContainer();

    render(component);

    const { element: submitButtonElement } = query({
      selector: 'input[type="submit"]',
    });
    expect(submitButtonElement).not.toBeNull();
  });

  it('calls fetch with the right properties when submitting data', () => {
    const component = <CustomerForm />;
    const { render, interact } = createContainer();

    render(component);
    interact({ formId: thisFormId }).interactiveForm.submit();

    expect(window.fetch).toHaveBeenCalledWith(
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
    window.fetch.mockReturnValue(fetchResponse);

    const component = <CustomerForm onSave={saveSpy} />;
    const { render, interact } = createContainer();

    render(component);
    await interact({ formId: thisFormId }).interactiveForm.submitAndWait();

    expect(saveSpy).toHaveBeenCalledWith(customer);
  });

  it('does not notify onSave if the POST request returns an error', async () => {
    const saveSpy = jest.fn();

    // ***

    const fetchResponse = getFetchResponseError();
    window.fetch.mockReturnValue(fetchResponse);

    const component = <CustomerForm onSave={saveSpy} />;
    const { render, interact } = createContainer();

    render(component);
    await interact({ formId: thisFormId }).interactiveForm.submitAndWait();

    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('prevents the default action when submitting the form', async () => {
    const preventDefaultSpy = jest.fn();

    const component = <CustomerForm />;
    const { render, interact } = createContainer();

    render(component);
    await interact({ formId: thisFormId }).interactiveForm.submitAndWait({
      preventDefault: preventDefaultSpy,
    });

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('renders error message when fetch call fails', async () => {
    const fetchResponse = getFetchResponseError();
    window.fetch.mockReturnValue(fetchResponse);

    const component = <CustomerForm />;
    const { render, query, interact } = createContainer();

    render(component);
    await interact({ formId: thisFormId }).interactiveForm.submitAndWait();

    const { element: errorElement } = query({ selector: '.error' });
    expect(errorElement).not.toBeNull();
    expect(errorElement.textContent).toMatch('error occurred');
  });

  it('clears error message when fetch call succeeds', async () => {
    const fetchResponseError = getFetchResponseError();
    const fetchResponseOk = getFetchResponseOk();
    window.fetch.mockReturnValue(fetchResponseError);
    window.fetch.mockReturnValue(fetchResponseOk);

    const component = <CustomerForm />;
    const { render, query, interact } = createContainer();

    render(component);
    const {
      interactiveForm: { submitAndWait },
    } = interact({ formId: thisFormId });
    await submitAndWait();
    await submitAndWait();

    const { element: errorElement } = query({ selector: '.error' });
    expect(errorElement).toBeNull();
  });
});
