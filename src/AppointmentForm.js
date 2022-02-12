import { useState } from 'react';

export { AppointmentForm };

const AppointmentForm = ({
  selectableServices, //
  service,
  onSubmit,
}) => {
  const [appointment, setAppointment] = useState({ service });

  return (
    <form id='appointment' onSubmit={() => onSubmit(appointment)}>
      <label htmlFor='service'>Service</label>
      <select
        id='service'
        name='service'
        defaultValue={service}
        onChange={({ target: { value } }) =>
          setAppointment((oldState) => ({ ...oldState, service: value }))
        }
      >
        <option />
        {selectableServices.map((service) => (
          <option key={service}>{service}</option>
        ))}
      </select>
    </form>
  );
};

AppointmentForm.defaultProps = {
  selectableServices: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions',
  ],
};
