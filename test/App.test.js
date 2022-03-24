import {
  createShallowRenderer,
  getChildrenFrom,
  compareByType,
  compareByClassName,
} from './utils/shallowHelpers';

import { AppointmentsDayViewLoader } from '../src/AppointmentsDayViewLoader';
import { App } from '../src/App';

describe('App', () => {
  it('initially shows the AppointmentDayViewLoader', () => {
    const component = <App />;
    const { render, getElementsMatching } = createShallowRenderer();

    render(component);

    const elements = getElementsMatching(
      compareByType(AppointmentsDayViewLoader),
    );
    expect(elements).toBeDefined();
  });

  it('has a button bar as the first child', () => {
    const component = <App />;
    const { render, getChild } = createShallowRenderer();

    render(component);

    const element = getChild(0);
    expect(element.type).toEqual('div');
    expect(element.props.className).toEqual('button-bar');
  });

  it('has a button to initiate add customer and appointment action', () => {
    const component = <App />;
    const { render, getElementsMatching } = createShallowRenderer();

    render(component);

    const buttons = getChildrenFrom(
      getElementsMatching(compareByClassName('button-bar'))[0],
    );
    expect(buttons[0].type).toEqual('button');
    expect(buttons[0].props.children).toEqual('Add customer and appointment');
  });
});
