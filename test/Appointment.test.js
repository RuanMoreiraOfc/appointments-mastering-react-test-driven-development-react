import { createContainer } from './utils/domManipulators';

import { Appointment } from '../src/Appointment';

describe('Appointment', () => {
  it('renders the customer first name', () => {
    const customer = { firstName: 'Ashley' };
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(container.textContent).toMatch('Ashley');
  });

  it('renders another customer first name', () => {
    const customer = { firstName: 'Jordan' };
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(container.textContent).toMatch('Jordan');
  });

  it('renders the customer last name', () => {
    const customer = { firstName: 'Ashley', lastName: 'Garcia' };
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(container.textContent).toMatch('Ashley Garcia');
  });

  it('renders another customer last name', () => {
    const customer = { firstName: 'Jordan', lastName: 'Brown' };
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(container.textContent).toMatch('Jordan Brown');
  });

  it('renders customer label', () => {
    const customer = { firstName: 'Ashley', lastName: 'Garcia' };
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(container.textContent).toMatch('Customer: Ashley Garcia');
  });

  it('renders in a table element', () => {
    const customer = {};
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(container.firstElementChild.tagName).toEqual('TABLE');
  });

  it('renders label in a separated td', () => {
    const customer = {};
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(container.querySelector('td').textContent).toEqual('Customer: ');
  });

  it('renders phone number label', () => {
    const customer = {};
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(container.querySelector('tr:nth-child(2) td').textContent).toEqual(
      'Phone number: ',
    );
  });

  it('renders customer phone number', () => {
    const customer = { phoneNumber: '(111) 222-3333' };
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(
      container.querySelector('tr:nth-child(2) td:nth-child(2)').textContent,
    ).toEqual('(111) 222-3333');
  });

  it('renders another customer phone number', () => {
    const customer = { phoneNumber: '(222) 333-4444' };
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(
      container.querySelector('tr:nth-child(2) td:nth-child(2)').textContent,
    ).toEqual('(222) 333-4444');
  });

  it('renders stylist label', () => {
    const customer = {};
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(container.querySelector('tr:nth-child(3) td').textContent).toEqual(
      'Stylist: ',
    );
  });

  it('renders customer stylist', () => {
    const customer = { stylist: 'Mario' };
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(
      container.querySelector('tr:nth-child(3) td:nth-child(2)').textContent,
    ).toEqual('Mario');
  });

  it('renders another customer stylist', () => {
    const customer = { stylist: 'Zack' };
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(
      container.querySelector('tr:nth-child(3) td:nth-child(2)').textContent,
    ).toEqual('Zack');
  });

  it('renders service label', () => {
    const customer = {};
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(container.querySelector('tr:nth-child(4) td').textContent).toEqual(
      'Service: ',
    );
  });

  it('renders customer service', () => {
    const customer = { service: 'Cut' };
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(
      container.querySelector('tr:nth-child(4) td:nth-child(2)').textContent,
    ).toEqual('Cut');
  });

  it('renders another customer service', () => {
    const customer = { service: 'Beard trim' };
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(
      container.querySelector('tr:nth-child(4) td:nth-child(2)').textContent,
    ).toEqual('Beard trim');
  });

  it('renders notes label', () => {
    const customer = {};
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(container.querySelector('tr:nth-child(5) td').textContent).toEqual(
      'Notes: ',
    );
  });

  it('renders customer notes', () => {
    const customer = { notes: 'None' };
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(
      container.querySelector('tr:nth-child(5) td:nth-child(2)').textContent,
    ).toEqual('None');
  });

  it('renders another customer service', () => {
    const customer = {
      notes:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    };
    const component = <Appointment customer={customer} />;
    const { container, render } = createContainer();

    render(component);

    expect(
      container.querySelector('tr:nth-child(5) td:nth-child(2)').textContent,
    ).toEqual(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
        'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    );
  });
});
