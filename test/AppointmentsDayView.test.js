import React from 'react';
import ReactDOM from 'react-dom';

import { AppointmentsDayView } from '../src/AppointmentsDayView';

describe('AppointmentsDayView', () => {
  const createContainer = () => document.createElement('div');

  const render = (container) => (component) =>
    ReactDOM.render(component, container);

  it('renders a div with the right id', () => {
    const appointments = [];
    const component = <AppointmentsDayView appointments={appointments} />;
    const container = createContainer();

    render(container)(component);

    expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
  });
});
