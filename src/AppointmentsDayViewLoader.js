import { useEffect } from 'react';

export { AppointmentsDayViewLoader };

const AppointmentsDayViewLoader = ({ today }) => {
  useEffect(() => {
    const from = today.setHours(0, 0, 0, 0);
    const to = today.setHours(23, 59, 59, 999);

    const fetchAppointments = () => {
      window.fetch(`/appointments/${from}-${to}`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
      });
    };

    fetchAppointments();
  }, []);

  return null;
};