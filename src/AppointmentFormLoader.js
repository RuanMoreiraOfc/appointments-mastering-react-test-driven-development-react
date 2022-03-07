import { useEffect } from 'react';

import { AppointmentForm } from './AppointmentForm';

export { AppointmentFormLoader };

const AppointmentFormLoader = () => {
  useEffect(() => {
    const fetchAvailableTimeSlots = () => {
      window.fetch('/available-time-slots', {
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
      });
    };

    fetchAvailableTimeSlots();
  }, []);

  return <AppointmentForm availableTimeSlots={[]} />;
};
