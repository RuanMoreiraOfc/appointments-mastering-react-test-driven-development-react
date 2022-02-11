import React from 'react';
import ReactDOM from 'react-dom';

import { Appointment } from '../src/Appointment';

describe('Appointment', () => {
  const createContainer = () => document.createElement('div');

  const render = (container) => (component) =>
    ReactDOM.render(component, container);

  it('renders the customer first name', () => {
    const customer = { firstName: 'Ashley' };
    const component = <Appointment customer={customer} />;
    const container = createContainer();

    render(container)(component);

    expect(container.textContent).toMatch('Ashley');
  });

  it('renders another customer first name', () => {
    const customer = { firstName: 'Jordan' };
    const component = <Appointment customer={customer} />;
    const container = createContainer();

    render(container)(component);

    expect(container.textContent).toMatch('Jordan');
  });

  it('renders the customer last name', () => {
    const customer = { firstName: 'Ashley', lastName: 'Garcia' };
    const component = <Appointment customer={customer} />;
    const container = createContainer();

    render(container)(component);

    expect(container.textContent).toMatch('Ashley Garcia');
  });

  it('renders another customer last name', () => {
    const customer = { firstName: 'Jordan', lastName: 'Brown' };
    const component = <Appointment customer={customer} />;
    const container = createContainer();

    render(container)(component);

    expect(container.textContent).toMatch('Jordan Brown');
  });

  it('renders customer label', () => {
    const customer = { firstName: 'Ashley', lastName: 'Garcia' };
    const component = <Appointment customer={customer} />;
    const container = createContainer();

    render(container)(component);

    expect(container.textContent).toMatch('Customer: Ashley Garcia');
  });

  it('renders in a table element', () => {
    const customer = {};
    const component = <Appointment customer={customer} />;
    const container = createContainer();

    render(container)(component);

    expect(container.firstElementChild.tagName).toEqual('TABLE');
  });

  it('renders label in a separated td', () => {
    const customer = {};
    const component = <Appointment customer={customer} />;
    const container = createContainer();

    render(container)(component);

    expect(container.querySelector('td').textContent).toEqual('Customer: ');
  });

  it('renders phone number label', () => {
    const customer = {};
    const component = <Appointment customer={customer} />;
    const container = createContainer();

    render(container)(component);

    expect(container.querySelector('tr:nth-child(2) td').textContent).toEqual(
      'Phone number: ',
    );
  });

  it('renders customer phone number', () => {
    const customer = { phoneNumber: '(111) 222-3333' };
    const component = <Appointment customer={customer} />;
    const container = createContainer();

    render(container)(component);

    expect(
      container.querySelector('tr:nth-child(2) td:nth-child(2)').textContent,
    ).toEqual('(111) 222-3333');
  });

  it('renders another customer phone number', () => {
    const customer = { phoneNumber: '(222) 333-4444' };
    const component = <Appointment customer={customer} />;
    const container = createContainer();

    render(container)(component);

    expect(
      container.querySelector('tr:nth-child(2) td:nth-child(2)').textContent,
    ).toEqual('(222) 333-4444');
  });

  it('renders stylist label', () => {
    const customer = {};
    const component = <Appointment customer={customer} />;
    const container = createContainer();

    render(container)(component);

    expect(container.querySelector('tr:nth-child(3) td').textContent).toEqual(
      'Stylist: ',
    );
  });

  it('renders customer stylist', () => {
    const customer = { stylist: 'Mario' };
    const component = <Appointment customer={customer} />;
    const container = createContainer();

    render(container)(component);

    expect(
      container.querySelector('tr:nth-child(3) td:nth-child(2)').textContent,
    ).toEqual('Mario');
  });

  it('renders another customer stylist', () => {
    const customer = { stylist: 'Zack' };
    const component = <Appointment customer={customer} />;
    const container = createContainer();

    render(container)(component);

    expect(
      container.querySelector('tr:nth-child(3) td:nth-child(2)').textContent,
    ).toEqual('Zack');
  });

  it('renders service label', () => {
    const customer = {};
    const component = <Appointment customer={customer} />;
    const container = createContainer();

    render(container)(component);

    expect(container.querySelector('tr:nth-child(4) td').textContent).toEqual(
      'Service: ',
    );
  });
});
