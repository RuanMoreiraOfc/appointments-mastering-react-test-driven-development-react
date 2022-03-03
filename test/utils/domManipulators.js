import ReactDOM from 'react-dom';

export { createContainer };

const createContainer = () => {
  const container = document.createElement('div');

  const getElement = (selector) => container.querySelector(selector);
  const getElements = (selector) =>
    Array.from(container.querySelectorAll(selector));

  // #region FORM

  const getForm = (id) => container.querySelector(`form[id="${id}"]`);

  const getLabelFromForm = (formId) => (field) =>
    getForm(formId).querySelector(`label[for="${field}"]`);

  const getFieldFromForm = (formId) => (field) =>
    getForm(formId).elements[field];

  // #endregion

  return {
    render: (component) => ReactDOM.render(component, container),
    container,
    query({ selector, formId, field } = {}) {
      const element = getElement(selector);
      const elements = getElements(selector);
      const formElement = getForm(formId);
      const labelElement = (formId && getLabelFromForm(formId)(field)) || null;
      const fieldElement = (formId && getFieldFromForm(formId)(field)) || null;

      return Object.assign(
        {},
        { element },
        { elements },
        { formElement },
        { labelElement },
        { fieldElement },
      );
    },
  };
};
