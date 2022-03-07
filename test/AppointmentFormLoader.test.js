// INFO: create a simple mock instead of {import 'whatwg-fetch'};

window.fetch = () => {};

import { createContainer } from './utils/domManipulators';
import { getFetchResponseOk } from './utils/spyHelpers';

import * as AppointmentFormExports from '../src/AppointmentForm';
import { AppointmentFormLoader } from '../src/AppointmentFormLoader';

describe('AppointmentFormLoader', () => {
  const today = new Date();
  const availableTimeSlots = [{ startsAt: today.setHours(9, 0, 0, 0) }];

  beforeEach(() => {
    const fetchResponse = getFetchResponseOk(availableTimeSlots);
    jest.spyOn(window, 'fetch').mockReturnValue(fetchResponse);
    jest.spyOn(AppointmentFormExports, 'AppointmentForm').mockReturnValue(null);
  });

  afterEach(() => {
    window.fetch.mockRestore();
    AppointmentFormExports.AppointmentForm.mockRestore();
  });

  it('fetches data when component is mounted', async () => {
    const component = <AppointmentFormLoader />;
    const { renderAndPromise } = createContainer();

    await renderAndPromise(component);

    expect(window.fetch).toHaveBeenCalledWith(
      '/available-time-slots',
      expect.objectContaining({
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });

  it('initially passes no data to AppointmentForm', async () => {
    const component = <AppointmentFormLoader />;
    const { renderAndPromise } = createContainer();

    await renderAndPromise(component);

    expect(AppointmentFormExports.AppointmentForm).toHaveBeenCalledWith(
      { availableTimeSlots: [] },
      expect.anything(),
    );
  });

  it('displays time slots that are fetched on mount', async () => {
    const component = <AppointmentFormLoader />;
    const { renderAndPromise } = createContainer();

    await renderAndPromise(component);

    expect(AppointmentFormExports.AppointmentForm).toHaveBeenLastCalledWith(
      { availableTimeSlots },
      expect.anything(),
    );
  });
});
