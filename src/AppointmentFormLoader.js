import { useEffect } from 'react';

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

  return null;
};
