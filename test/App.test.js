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
});
