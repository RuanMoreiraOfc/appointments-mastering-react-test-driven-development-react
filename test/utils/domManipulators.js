import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ReactTestUtils from 'react-dom/test-utils';

export { createContainer, simulateEvent, simulateEventAndWait };

const createContainer = () => {
  const container = document.createElement('div');

  const getElement = (selector) => container.querySelector(selector);
  const getElements = (selector) =>
    Array.from(container.querySelectorAll(selector));

  // #region TABLE

  const getTable = (id) => container.querySelector(`table[id="${id}"]`);

  // #endregion

  // #region FORM

  const getForm = (id) => container.querySelector(`form[id="${id}"]`);

  const getLabelFromForm = (formId) => (field) =>
    getForm(formId).querySelector(`label[for="${field}"]`);

  const getFieldFromForm = (formId) => (field) =>
    getForm(formId).elements[field];

  const getFieldsFromForm = (formId) => (field) =>
    Array.from(getForm(formId).elements).filter(
      (fieldElement) => fieldElement.name === field,
    );

  // #endregion

  // #region INTERACTIONS

  const click = (element) => simulateEvent('click').bind(null, element);
  const change = (element) => simulateEvent('change').bind(null, element);
  const submit = (element) => simulateEvent('submit').bind(null, element);
  const submitAndWait = (element) =>
    simulateEventAndWait('submit').bind(null, element);

  // #endregion

  return {
    render: (component) =>
      act(() => {
        ReactDOM.render(component, container);
      }),
    container,
    query({ selector, tableId, formId, field } = {}) {
      const element = getElement(selector);
      const elements = getElements(selector);
      const tableElement = getTable(tableId);
      const formElement = getForm(formId);
      const labelElement = (formId && getLabelFromForm(formId)(field)) || null;
      const fieldElement = (formId && getFieldFromForm(formId)(field)) || null;
      const fieldElements =
        (formId && getFieldsFromForm(formId)(field)) || null;

      return Object.assign(
        {},
        { element },
        { elements },
        { tableElement },
        { formElement },
        { labelElement },
        { fieldElement },
        { fieldElements },
      );
    },
    interact({ selector, tableId, formId, field } = {}) {
      const element = getElement(selector);
      const elements = getElements(selector);
      const tableElement = getTable(tableId);
      const formElement = getForm(formId);
      const fieldElement = (formId && getFieldFromForm(formId)(field)) || null;
      const fieldElements =
        (formId && getFieldsFromForm(formId)(field)) || null;

      return Object.assign(
        {},
        element && {
          interactiveElement: {
            click: click(element),
            change: change(element),
            submit: submit(element),
            submitAndWait: submitAndWait(element),
          },
        },
        elements && {
          interactiveElements: elements.map((element) => ({
            click: click(element),
            change: change(element),
            submit: submit(element),
            submitAndWait: submitAndWait(element),
          })),
        },
        tableElement && {
          interactiveTable: {
            submit: submit(tableElement),
            submitAndWait: submitAndWait(tableElement),
          },
        },
        formElement && {
          interactiveForm: {
            submit: submit(formElement),
            submitAndWait: submitAndWait(formElement),
          },
        },
        fieldElement && {
          interactiveField: {
            change: change(fieldElement),
          },
        },
        fieldElements && {
          interactiveFields: fieldElements.map((element) => ({
            change: change(element),
          })),
        },
      );
    },
  };
};

const simulateEvent = (eventName) => (element, eventData) =>
  ReactTestUtils.Simulate[eventName](element, eventData);

const simulateEventAndWait = (eventName) => async (element, eventData) =>
  await act(async () => ReactTestUtils.Simulate[eventName](element, eventData));
