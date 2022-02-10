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
});
