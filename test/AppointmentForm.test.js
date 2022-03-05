// INFO: create a simple mock instead of {import 'whatwg-fetch'};

window.fetch = () => {};

import { createContainer } from './utils/domManipulators';
import {
  getFetchResponseOk,
  getFetchResponseError,
  getRequestBodyOf,
} from './utils/spyHelpers';

import { AppointmentForm } from '../src/AppointmentForm';

describe('AppointmentForm', () => {
  const thisFormId = 'appointment';
  const thisTableId = 'time-slots';

  const findOptionFrom = (dropdownNode) => (textContent) => {
    const options = Array.from(dropdownNode.childNodes);
    return options.find((option) => option.textContent === textContent);
  };

  beforeEach(() => {
    const fetchResponse = getFetchResponseOk({});
    jest.spyOn(window, 'fetch').mockReturnValue(fetchResponse);
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it('renders a form', () => {
    const component = <AppointmentForm />;
    const { render, query } = createContainer();

    render(component);

    const { formElement } = query({ formId: thisFormId });
    expect(formElement).not.toBeNull();
  });

  // #region GENERIC USE CASES

  const itRendersAsASelectBox = (fieldName) => {
    it('renders as a select box', () => {
      const component = <AppointmentForm />;
      const { render, query } = createContainer();

      render(component);

      const { fieldElement } = query({ formId: thisFormId, field: fieldName });
      expect(fieldElement).toBeTruthy();
      expect(fieldElement.tagName).toEqual('SELECT');
    });
  };

  const itInitiallyHasABlankValueChosen = (fieldName) => {
    it('initially has a blank value chosen', () => {
      const component = <AppointmentForm />;
      const { render, query } = createContainer();

      render(component);

      const {
        fieldElement: {
          childNodes: [firstNode],
        },
      } = query({ formId: thisFormId, field: fieldName });
      expect(firstNode).toBeTruthy();
      expect(firstNode.value).toEqual('');
      expect(firstNode.selected).toBeTruthy();
    });
  };

  const itListAllOptions = (fieldName) => (listProperty) => {
    it('lists all options', () => {
      const options = ['A', 'B'];
      const component = <AppointmentForm {...{ [listProperty]: options }} />;
      const { render, query } = createContainer();

      render(component);

      const optionNodes = Array.from(
        query({ formId: thisFormId, field: fieldName }).fieldElement.childNodes,
      );
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
      const { render, query } = createContainer();

      render(component);

      const { fieldElement } = query({ formId: thisFormId, field: fieldName });
      const option = findOptionFrom(fieldElement)('A');
      expect(option.selected).toBeTruthy();
    });
  };

  const itRendersALabel = (fieldName) => (labelText) => {
    it('renders a label', () => {
      const component = <AppointmentForm />;
      const { render, query } = createContainer();

      render(component);

      const { labelElement } = query({ formId: thisFormId, field: fieldName });
      expect(labelElement).not.toBeNull();
      expect(labelElement.textContent).toEqual(labelText);
    });
  };

  const itAssignsAnIdThatMatchesTheLabelId = (fieldName) => {
    it('assigns an id that matches the label', () => {
      const component = <AppointmentForm />;
      const { render, query } = createContainer();

      render(component);

      const { fieldElement } = query({ formId: thisFormId, field: fieldName });
      expect(fieldElement.id).toEqual(fieldName);
    });
  };

  const itSubmitsExistingValue = (fieldName) => (listProperty) => {
    it('saves existing value when submitted', () => {
      const defaultFields = { [fieldName]: 'A' };
      const defaultProps = {
        ...defaultFields,
        [listProperty]: ['A', 'B'],
      };
      const component = <AppointmentForm {...defaultProps} />;
      const { render, interact } = createContainer();

      render(component);
      const { interactiveForm } = interact({ formId: thisFormId });
      interactiveForm.submit();

      const body = getRequestBodyOf(window.fetch);
      expect(body).toMatchObject(defaultFields);
    });
  };

  const itSubmitsNewValue = (fieldName) => (listProperty) => {
    it('saves new value when submitted', () => {
      const defaultFields = { [fieldName]: 'A' };
      const atEndFields = { [fieldName]: 'B' };
      const defaultProps = {
        ...defaultFields,
        [listProperty]: ['A', 'B'],
      };
      const component = <AppointmentForm {...defaultProps} />;
      const { render, interact } = createContainer();

      render(component);
      const { interactiveForm, interactiveField } = interact({
        formId: thisFormId,
        field: fieldName,
      });
      interactiveField.change({
        target: { value: 'B' },
      });
      interactiveForm.submit();

      const body = getRequestBodyOf(window.fetch);
      expect(body).toMatchObject(atEndFields);
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
      const { render, query } = createContainer();

      render(component);

      const {
        fieldElement: { childNodes: options },
      } = query({ formId: thisFormId, field: 'stylist' });
      expect(options).toHaveLength(2);
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
      const { render, query, interact } = createContainer();

      render(component);
      const { interactiveField: interactiveServiceField } = interact({
        formId: thisFormId,
        field: 'service',
      });
      interactiveServiceField.change({
        target: { value: '2' },
      });

      const { fieldElement: stylistFieldElement } = query({
        formId: thisFormId,
        field: 'stylist',
      });
      expect(stylistFieldElement.childNodes).toHaveLength(3);
    });
  });

  describe('time slot table', () => {
    it('renders a table for time slots', () => {
      const component = <AppointmentForm />;
      const { render, query } = createContainer();

      render(component);

      const { tableElement } = query({ tableId: thisTableId });
      expect(tableElement).not.toBeNull();
    });

    it('renders a time slot for every half an hour between open and close times', () => {
      const component = <AppointmentForm salonOpensAt={9} salonClosesAt={11} />;
      const { render, query } = createContainer();

      render(component);

      const { tableElement } = query({ tableId: thisTableId });
      const timesOfDay = tableElement.querySelectorAll('tbody th');
      expect(timesOfDay).toHaveLength(4);
      expect(timesOfDay[0].textContent).toEqual('09:00');
      expect(timesOfDay[1].textContent).toEqual('09:30');
      expect(timesOfDay[3].textContent).toEqual('10:30');
    });

    it('renders an empty cell at the start of the header row', () => {
      const component = <AppointmentForm />;
      const { render, query } = createContainer();

      render(component);

      const { tableElement } = query({ tableId: thisTableId });
      const headerRow = tableElement.querySelector('thead > tr');
      expect(headerRow).not.toBeNull();
      expect(headerRow.firstChild).not.toBeNull();
      expect(headerRow.firstChild.textContent).toEqual('');
    });

    it('renders a week of available dates', () => {
      const today = new Date(2022, 2, 13);
      const component = <AppointmentForm today={today} />;
      const { render, query } = createContainer();

      render(component);

      const { tableElement } = query({ tableId: thisTableId });
      const dates = tableElement.querySelectorAll('thead th:not(:first-child)');
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
      const { render, query } = createContainer();

      render(component);

      const { tableElement } = query({ tableId: thisTableId });
      const cells = tableElement.querySelectorAll('td');
      expect(cells).not.toHaveLength(0);
      expect(cells[0].querySelector('input[type="radio"]')).not.toBeNull();
      expect(cells[7].querySelector('input[type="radio"]')).not.toBeNull();
    });

    it('does not render radio buttons for unavailable time slots', () => {
      const component = <AppointmentForm availableTimeSlots={[]} />;
      const { render, query } = createContainer();

      render(component);

      const { tableElement } = query({ tableId: thisTableId });
      const timesOfDay = tableElement.querySelectorAll('input');
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
      const { render, query } = createContainer();

      render(component);

      const {
        fieldElements: [firstFieldElement, secondFieldElement],
      } = query({
        formId: thisFormId,
        field: 'startsAt',
      });
      expect(firstFieldElement.value).toEqual(
        availableTimeSlots[0].startsAt.toString(),
      );
      expect(secondFieldElement.value).toEqual(
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
      const { render, query } = createContainer();

      render(component);

      const {
        fieldElements: [fieldElement],
      } = query({
        formId: thisFormId,
        field: 'startsAt',
      });
      expect(fieldElement).toBeTruthy();
      expect(fieldElement.defaultChecked).toEqual(true);
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
        />
      );
      const { render, query, interact } = createContainer();

      render(component);
      const {
        interactiveForm,
        interactiveFields: [, interactiveField],
      } = interact({
        formId: thisFormId,
        field: 'startsAt',
      });
      interactiveField.change({
        target: {
          value: String(availableTimeSlots[1].startsAt),
        },
      });
      interactiveForm.submit();

      const body = getRequestBodyOf(window.fetch);
      expect(body).toMatchObject({ startsAt: availableTimeSlots[1].startsAt });
      const { fieldElement } = query({
        formId: thisFormId,
        field: 'startsAt',
      });
      expect(fieldElement.checked).toEqual(false);
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
      const { render, query } = createContainer();

      render(component);

      const { fieldElements } = query({
        formId: thisFormId,
        field: 'startsAt',
      });
      expect(fieldElements).toHaveLength(1);
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
      const { render, query, interact } = createContainer();

      render(component);
      const { interactiveField: interactiveStylistField } = interact({
        formId: thisFormId,
        field: 'stylist',
      });
      interactiveStylistField.change({
        target: { value: 'B' },
      });

      const { fieldElements } = query({
        formId: thisFormId,
        field: 'startsAt',
      });
      expect(fieldElements).toHaveLength(2);
    });
  });

  it('has a submit button', () => {
    const component = <AppointmentForm />;
    const { render, query } = createContainer();

    render(component);

    const { element: submitButtonElement } = query({
      selector: 'input[type="submit"]',
    });
    expect(submitButtonElement).not.toBeNull();
  });

  it('calls fetch with the right properties when submitting data', () => {
    const component = <AppointmentForm />;
    const { render, interact } = createContainer();

    render(component);
    interact({ formId: thisFormId }).interactiveForm.submit();

    expect(window.fetch).toHaveBeenCalledWith(
      '/appointments',
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

    const fetchResponse = getFetchResponseOk();
    window.fetch.mockReturnValue(fetchResponse);

    const component = <AppointmentForm onSave={saveSpy} />;
    const { render, interact } = createContainer();

    render(component);
    await interact({ formId: thisFormId }).interactiveForm.submitAndWait();

    expect(saveSpy).toHaveBeenCalled();
  });

  it('does not notify onSave if the POST request returns an error', async () => {
    const saveSpy = jest.fn();

    // ***

    const fetchResponse = getFetchResponseError();
    window.fetch.mockReturnValue(fetchResponse);

    const component = <AppointmentForm onSave={saveSpy} />;
    const { render, interact } = createContainer();

    render(component);
    await interact({ formId: thisFormId }).interactiveForm.submitAndWait();

    expect(saveSpy).not.toHaveBeenCalled();
  });

  it('prevents the default action when submitting the form', async () => {
    const preventDefaultSpy = jest.fn();

    const component = <AppointmentForm />;
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

    const component = <AppointmentForm />;
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

    const component = <AppointmentForm />;
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
