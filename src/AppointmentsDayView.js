import React from 'react';

export { AppointmentsDayView };

const AppointmentsDayView = ({ appointments }) => (
  <div id='appointmentsDayView'>
    <ol>
      {appointments.map((appointment) => (
        <li key={appointment.startsAt}>
          {dateToTimeString(appointment.startsAt)}
        </li>
      ))}
    </ol>
    <p>There are no appointments scheduled for today.</p>
  </div>
);

const dateToTimeString = (time) => {
  const date = new Date(time);
  return date.toLocaleTimeString('en-UK', {
    hour: 'numeric',
    minute: 'numeric',
  });
};
