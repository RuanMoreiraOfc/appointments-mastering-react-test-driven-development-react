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

  it('initially passes no data to AppointmentsDayView', async () => {
    const component = <AppointmentsDayViewLoader />;
    const { renderAndPromise } = createContainer();

    await renderAndPromise(component);

    expect(AppointmentsDayViewExports.AppointmentsDayView).toHaveBeenCalledWith(
      { appointments: [] },
      expect.anything(),
    );
  });

  it('displays time slots that are fetched on mount', async () => {
    const component = <AppointmentsDayViewLoader />;
    const { renderAndPromise } = createContainer();

    await renderAndPromise(component);

    expect(
      AppointmentsDayViewExports.AppointmentsDayView,
    ).toHaveBeenLastCalledWith({ appointments }, expect.anything());
  });

  it('re-requests appointment when today prop changes', async () => {
    const tomorrow = new Date(today);
    tomorrow.setHours(24);
    const from = tomorrow.setHours(0, 0, 0, 0);
    const to = tomorrow.setHours(23, 59, 59, 999);
    const component = <AppointmentsDayViewLoader today={today} />;
    const componentTomorrow = <AppointmentsDayViewLoader today={tomorrow} />;
    const { renderAndPromise } = createContainer();

    await renderAndPromise(component);
    await renderAndPromise(componentTomorrow);

    expect(window.fetch).toHaveBeenLastCalledWith(
      `/appointments/${from}-${to}`,
      expect.anything(),
    );
  });
});
