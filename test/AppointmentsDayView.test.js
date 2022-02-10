import React from 'react';
import ReactDOM from 'react-dom';

import { AppointmentsDayView } from '../src/AppointmentsDayView';

describe('AppointmentsDayView', () => {
  const createContainer = () => document.createElement('div');

  const render = (container) => (component) =>
    ReactDOM.render(component, container);

  // ***

  const today = new Date();
  const appointments = [
    {
      startsAt: today.setHours(12, 0),
      customer: { firstName: 'Ashley' },
    },
    {
      startsAt: today.setHours(13, 0),
      customer: { firstName: 'Jordan' },
    },
  ];

  it('renders a div with the right id', () => {
    const appointments = [];
    const component = <AppointmentsDayView appointments={appointments} />;
    const container = createContainer();

    render(container)(component);

    expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
  });

  it('renders multiple appointments in an ol element', () => {
    const component = <AppointmentsDayView appointments={appointments} />;
    const container = createContainer();

    render(container)(component);

    expect(container.querySelector('ol')).not.toBeNull();
    expect(container.querySelector('ol').children).toHaveLength(2);
  });

  it('renders each appointment in an li', () => {
    const component = <AppointmentsDayView appointments={appointments} />;
    const container = createContainer();

    render(container)(component);

    expect(container.querySelectorAll('li')).toHaveLength(2);
    expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00');
    expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00');
  });

  it('initially shows a message saying there are no appointments today', () => {
    const component = <AppointmentsDayView appointments={[]} />;
    const container = createContainer();

    render(container)(component);

    expect(container.textContent).toMatch(
      'There are no appointments scheduled for today.',
    );
  });

  it('selects the first appointment by default', () => {
    const component = <AppointmentsDayView appointments={appointments} />;
    const container = createContainer();

    render(container)(component);
    expect(container.textContent).toMatch('Ashley');
  });
});
