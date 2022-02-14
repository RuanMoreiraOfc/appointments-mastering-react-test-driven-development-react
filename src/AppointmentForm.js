import { useState } from 'react';

export { AppointmentForm };

const AppointmentForm = ({
  selectableServices,
  service,
  onSubmit,
  salonOpensAt,
  salonClosesAt,
  today,
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
      <TimeSlotTable
        salonOpensAt={salonOpensAt}
        salonClosesAt={salonClosesAt}
        today={today}
      />
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
  salonOpensAt: 9,
  salonClosesAt: 19,
  today: new Date(),
};

const TimeSlotTable = ({ salonOpensAt, salonClosesAt, today }) => {
  const dateSlots = createDateSlots({ startDate: today });
  const timeSlots = createTimeSlots({
    intervalInMinutes: 30,
    salonOpensAt,
    salonClosesAt,
  });

  return (
    <table id='time-slots'>
      <thead>
        <tr>
          <th />
          {dateSlots.map((dateAsString) => (
            <th key={dateAsString}>{dateAsString}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeSlots.map((timeAsString) => (
          <tr key={timeAsString}>
            <th>{timeAsString}</th>
            {dateSlots.map((dateAsString) => (
              <td key={dateAsString}>
                <input type='radio' />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const createTimeSlots = ({
  intervalInMinutes,
  salonOpensAt,
  salonClosesAt,
}) => {
  const startTime = new Date().setHours(salonOpensAt, 0, 0, 0);

  const intervalCountBySlot = 60 / intervalInMinutes;
  const intervalInMilliseconds = (60 * 60 * 1000) / intervalCountBySlot;
  const totalSlotsCount = (salonClosesAt - salonOpensAt) * intervalCountBySlot;

  const result = Array.from({ length: totalSlotsCount }, (_, i) => {
    const time = startTime + intervalInMilliseconds * i;
    const timeAsString = new Date(time).toLocaleTimeString(['en-UK'], {
      hour: '2-digit',
      minute: '2-digit',
    });

    return timeAsString;
  });

  return result;
};

const createDateSlots = ({ startDate }) => {
  const initialDate = new Date(startDate).setHours(0, 0, 0, 0);

  const intervalCountBySlot = 7;
  const intervalInMilliseconds = 24 * 60 * 60 * 1000;

  const result = Array.from({ length: intervalCountBySlot }, (_, i) => {
    const date = initialDate + intervalInMilliseconds * i;
    const dateAsString = new Date(date).toLocaleDateString(['en-GB'], {
      weekday: 'short',
      day: '2-digit',
    });

    return dateAsString;
  });

  return result;
};
