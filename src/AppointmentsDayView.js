import React from 'react';

import { Appointment } from './Appointment';

export { AppointmentsDayView };

const AppointmentsDayView = ({ appointments }) => (
  <div id='appointmentsDayView'>
    <ol>
      {appointments.map((appointment) => (
        <li key={appointment.startsAt}>
          <button type='button'>
            {dateToTimeString(appointment.startsAt)}
          </button>
        </li>
      ))}
    </ol>
    {appointments.length === 0 ? (
      <p>There are no appointments scheduled for today.</p>
    ) : (
      <Appointment {...appointments[0]} />
    )}
  </div>
);

const dateToTimeString = (time) => {
  const date = new Date(time);
  return date.toLocaleTimeString('en-UK', {
    hour: 'numeric',
    minute: 'numeric',
  });
};
