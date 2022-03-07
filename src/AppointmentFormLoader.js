import { useState, useEffect } from 'react';

import { AppointmentForm } from './AppointmentForm';

export { AppointmentFormLoader };

const AppointmentFormLoader = (props) => {
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    const fetchAvailableTimeSlots = async () => {
      const response = await window.fetch('/available-time-slots', {
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
      });

      setAvailableTimeSlots(await response.json());
    };

    fetchAvailableTimeSlots();
  }, []);

  return (
    <AppointmentForm //
      {...props}
      availableTimeSlots={availableTimeSlots}
    />
  );
};
