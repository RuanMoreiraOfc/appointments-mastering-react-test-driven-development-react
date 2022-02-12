import { sampleAppointments } from './sampleData';

import ReactDOM from 'react-dom';

import { AppointmentsDayView } from './AppointmentsDayView';

ReactDOM.render(
  <AppointmentsDayView appointments={sampleAppointments} />,
  document.getElementById('root'),
);
