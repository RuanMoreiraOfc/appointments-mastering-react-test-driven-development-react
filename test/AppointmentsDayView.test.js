import { createContainer } from './utils/domManipulators';

import { AppointmentsDayView } from '../src/AppointmentsDayView';

describe('AppointmentsDayView', () => {
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
    const { render, query } = createContainer();

    render(component);

    const { element: divElement } = query({
      selector: 'div#appointmentsDayView',
    });
    expect(divElement).not.toBeNull();
  });

  it('renders multiple appointments in an ol element', () => {
    const component = <AppointmentsDayView appointments={appointments} />;
    const { render, query } = createContainer();

    render(component);

    const { element: olElement } = query({ selector: 'ol' });
    expect(olElement).not.toBeNull();
    expect(olElement.children).toHaveLength(2);
  });

  it('renders each appointment in an li', () => {
    const component = <AppointmentsDayView appointments={appointments} />;
    const { render, query } = createContainer();

    render(component);

    const { elements: liElementList } = query({ selector: 'li' });
    expect(liElementList).toHaveLength(2);
    expect(liElementList[0].textContent).toEqual('12:00');
    expect(liElementList[1].textContent).toEqual('13:00');
  });

  it('initially shows a message saying there are no appointments today', () => {
    const component = <AppointmentsDayView appointments={[]} />;
    const { container, render } = createContainer();

    render(component);

    expect(container.textContent).toMatch(
      'There are no appointments scheduled for today.',
    );
  });

  it('selects the first appointment by default', () => {
    const component = <AppointmentsDayView appointments={appointments} />;
    const { container, render } = createContainer();

    render(component);

    expect(container.textContent).toMatch('Ashley');
  });

  it('has a button element in each li', () => {
    const component = <AppointmentsDayView appointments={appointments} />;
    const { render, query } = createContainer();

    render(component);

    const { elements: buttonElementList } = query({ selector: 'li > button' });
    expect(buttonElementList).toHaveLength(2);
    expect(buttonElementList[0].type).toEqual('button');
  });

  it('renders another appointment when selected', () => {
    const component = <AppointmentsDayView appointments={appointments} />;
    const { container, render, interact } = createContainer();

    render(component);
    const {
      interactiveElements: [, interactiveButton],
    } = interact({
      selector: 'button',
    });
    interactiveButton.click();

    expect(container.textContent).toMatch('Jordan');
  });
});
