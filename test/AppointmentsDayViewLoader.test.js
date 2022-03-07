// INFO: create a simple mock instead of {import 'whatwg-fetch'};

window.fetch = () => {};

import { createContainer } from './utils/domManipulators';
import { getFetchResponseOk } from './utils/spyHelpers';

import * as AppointmentsDayViewExports from '../src/AppointmentsDayView';
import { AppointmentsDayViewLoader } from '../src/AppointmentsDayViewLoader';

describe('AppointmentsDayViewLoader', () => {
  const today = new Date();
  const appointments = [
    { startsAt: today.setHours(9, 0, 0, 0) },
    { startsAt: today.setHours(10, 0, 0, 0) },
  ];

  beforeEach(() => {
    const fetchResponse = getFetchResponseOk(appointments);
    jest.spyOn(window, 'fetch').mockReturnValue(fetchResponse);
    jest
      .spyOn(AppointmentsDayViewExports, 'AppointmentsDayView')
      .mockReturnValue(null);
  });

  afterEach(() => {
    window.fetch.mockRestore();
    AppointmentsDayViewExports.AppointmentsDayView.mockRestore();
  });

  it('fetches appointments happening today when component is mounted', async () => {
    const from = today.setHours(0, 0, 0, 0);
    const to = today.setHours(23, 59, 59, 999);
    const component = <AppointmentsDayViewLoader today={today} />;
    const { renderAndPromise } = createContainer();

    await renderAndPromise(component);

    expect(window.fetch).toHaveBeenCalledWith(
      `/appointments/${from}-${to}`,
      expect.objectContaining({
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
      }),
    );
  });
});
