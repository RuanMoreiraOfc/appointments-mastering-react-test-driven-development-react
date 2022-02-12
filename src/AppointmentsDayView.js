import { useState } from 'react';

import { Appointment } from './Appointment';

export { AppointmentsDayView };

const AppointmentsDayView = ({ appointments }) => {
  const [selectedAppointment, setSelectedAppointment] = useState(0);

  return (
    <div id='appointmentsDayView'>
      <ol>
        {appointments.map((appointment, i) => (
          <li key={appointment.startsAt}>
            <button
              type='button'
              onClick={setSelectedAppointment.bind(null, i)}
            >
              {dateToTimeString(appointment.startsAt)}
            </button>
          </li>
        ))}
      </ol>
      {appointments.length === 0 ? (
        <p>There are no appointments scheduled for today.</p>
      ) : (
        <Appointment customer={appointments[selectedAppointment].customer} />
      )}
    </div>
  );
};

const dateToTimeString = (time) => {
  const date = new Date(time);
  return date.toLocaleTimeString('en-UK', {
    hour: 'numeric',
    minute: 'numeric',
  });
};
