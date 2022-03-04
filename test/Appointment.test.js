import { createContainer } from './utils/domManipulators';

import { Appointment } from '../src/Appointment';

describe('Appointment', () => {
  const getRowDataFrom = (container) => (lineNumber) =>
    container.querySelectorAll(`tr:nth-child(${lineNumber}) td`);

  it('renders in a table element', () => {
    const customer = {};
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(container.firstElementChild.tagName).toEqual('TABLE');
  });

  // #region GENERIC USE CASES

  const itRendersALabel = (lineNumber) => (labelText) => {
    it('renders a label', () => {
      const customer = {};
      const component = <Appointment customer={customer} />;
      const { container, render } = createContainer();

      render(component);

      const [label] = getRowDataFrom(container)(lineNumber);
      expect(label.textContent).toEqual(labelText);
    });
  };

  const itRendersTheData = (lineNumber) => (dataName) => (dataContent) => {
    it('renders the data', () => {
      const customer = { [dataName]: dataContent };
      const component = <Appointment customer={customer} />;
      const { container, render } = createContainer();

      render(component);

      const [, data] = getRowDataFrom(container)(lineNumber);
      expect(data.textContent).toEqual(dataContent);
    });
  };

  // #endregion

  describe('customer', () => {
    itRendersALabel(1)('Customer: ');

    it('renders the first name', () => {
      const customer = { firstName: 'Ashley' };
      const component = <Appointment customer={customer} />;
      const { container, render } = createContainer();

      render(component);

      const [, data] = getRowDataFrom(container)(1);
      expect(data.textContent).toEqual('Ashley ');
    });

    it('renders the last name', () => {
      const customer = { firstName: 'Ashley', lastName: 'Garcia' };
      const component = <Appointment customer={customer} />;
      const { container, render } = createContainer();

      render(component);

      const [, data] = getRowDataFrom(container)(1);
      expect(data.textContent).toEqual('Ashley Garcia');
    });
  });

  describe('phone number', () => {
    itRendersALabel(2)('Phone number: ');
    itRendersTheData(2)('phoneNumber')('(111) 222-3333');
  });

  describe('stylist', () => {
    itRendersALabel(3)('Stylist: ');
    itRendersTheData(3)('stylist')('Cut');
  });

  describe('service', () => {
    itRendersALabel(4)('Service: ');
    itRendersTheData(4)('service')('Cut');
  });

  describe('notes', () => {
    itRendersALabel(5)('Notes: ');
    itRendersTheData(5)('notes')('Lorem ipsum dolor');
  });
});
