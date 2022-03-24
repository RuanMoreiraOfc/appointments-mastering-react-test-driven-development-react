import { createShallowRenderer, compareByType } from './utils/shallowHelpers';

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
});
