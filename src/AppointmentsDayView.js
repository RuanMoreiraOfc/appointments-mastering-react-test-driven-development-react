import React from 'react';

export { AppointmentsDayView };

const AppointmentsDayView = ({ appointments }) => (
  <div id='appointmentsDayView'>
    <ol>
      {appointments.map((appointment) => (
        <div key={appointment.startsAt} />
      ))}
    </ol>
  </div>
);
