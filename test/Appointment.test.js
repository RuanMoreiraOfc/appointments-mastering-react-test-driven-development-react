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
});
