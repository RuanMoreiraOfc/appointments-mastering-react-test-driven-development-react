// INFO: create a simple mock instead of {import 'whatwg-fetch'};

window.fetch = () => {};

import { act } from 'react-dom/test-utils';
import ReactTestUtils from 'react-dom/test-utils';

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

    const { form } = query({ formId: thisFormId });
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
      const { render, query } = createContainer();

      render(component);

      const { field } = query({ formId: thisFormId, field: fieldName });
      expectToBeInputFieldOfTypeText(field);
    });
  };

  const itIncludesTheExistingValue = (fieldName) => {
    it('includes the existing value', () => {
      const component = <CustomerForm {...{ [fieldName]: 'value' }} />;
      const { render, query } = createContainer();

      render(component);

      const { field } = query({ formId: thisFormId, field: fieldName });
      expect(field.defaultValue).toEqual('value');
    });
  };

  const itRendersALabel = (fieldName) => (labelContent) => {
    it('renders a label for the field', () => {
      const component = <CustomerForm />;
      const { render, query } = createContainer();

      render(component);

      const { label } = query({ formId: thisFormId, field: fieldName });
      expect(label).not.toBeNull();
      expect(label.textContent).toEqual(labelContent);
    });
  };

  const itAssignsAnIdThatMatchesTheLabelId = (fieldId) => {
    it('assigns an id that matches the label', () => {
      const component = <CustomerForm />;
      const { render, query } = createContainer();

      render(component);

      const { field } = query({ formId: thisFormId, field: fieldId });
      expect(field.id).toEqual(fieldId);
    });
  };

  const itSubmitsExistingValue = (fieldName) => (value) => {
    it('saves existing value when submitted', () => {
      const defaultFields = { [fieldName]: value };
      const component = <CustomerForm {...defaultFields} />;
      const { render, query } = createContainer();

      render(component);
      const { form } = query({ formId: thisFormId });
      ReactTestUtils.Simulate.submit(form);

      const body = getRequestBodyOf(window.fetch);
      expect(body).toMatchObject(defaultFields);
    });
  };

  const itSubmitsNewValue = (fieldName) => (newValue) => {
    it('saves new value when submitted', () => {
      const defaultFields = { [fieldName]: 'value' };
      const atEndFields = { [fieldName]: newValue };
      const component = <CustomerForm {...defaultFields} />;
      const { render, query } = createContainer();

      render(component);
      const { form, field } = query({ formId: thisFormId, field: fieldName });
      ReactTestUtils.Simulate.change(field, {
        target: { value: newValue },
      });
      ReactTestUtils.Simulate.submit(form);

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

    const { element: submitButton } = query({
      selector: 'input[type="submit"]',
    });
    expect(submitButton).not.toBeNull();
  });

  it('calls fetch with the right properties when submitting data', () => {
    const component = <CustomerForm />;
    const { render, query } = createContainer();

    render(component);
    const { form } = query({ formId: thisFormId });
    ReactTestUtils.Simulate.submit(form);

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
    const { render, query } = createContainer();

    render(component);
    const { form } = query({ formId: thisFormId });
    await act(async () => {
      ReactTestUtils.Simulate.submit(form);
    });

    expect(saveSpy).toHaveBeenCalledWith(customer);
  });

  it('does not notify onSave if the POST request returns an error', async () => {
    const saveSpy = jest.fn();

    // ***

    const fetchResponse = getFetchResponseError();
    window.fetch.mockReturnValue(fetchResponse);

    const component = <CustomerForm onSave={saveSpy} />;
    const { render, query } = createContainer();

    render(component);
    const { form } = query({ formId: thisFormId });
    await act(async () => {
      ReactTestUtils.Simulate.submit(form);
    });

    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('prevents the default action when submitting the form', async () => {
    const preventDefaultSpy = jest.fn();

    const component = <CustomerForm />;
    const { render, query } = createContainer();

    render(component);
    const { form } = query({ formId: thisFormId });
    await act(async () => {
      ReactTestUtils.Simulate.submit(form, {
        preventDefault: preventDefaultSpy,
      });
    });

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('renders error message when fetch call fails', async () => {
    const fetchResponse = getFetchResponseError();
    window.fetch.mockReturnValue(fetchResponse);

    const component = <CustomerForm />;
    const { render, query } = createContainer();

    render(component);
    const { form } = query({ formId: thisFormId });
    await act(async () => {
      ReactTestUtils.Simulate.submit(form);
    });

    const { element: errorElement } = query({ selector: '.error' });
    expect(errorElement).not.toBeNull();
    expect(errorElement.textContent).toMatch('error occurred');
  });
});
