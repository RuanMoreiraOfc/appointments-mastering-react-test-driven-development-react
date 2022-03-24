import { Fragment } from 'react';

import { AppointmentsDayViewLoader } from './AppointmentsDayViewLoader';

export { App };

const App = () => (
  <Fragment>
    <div className='button-bar' />
    <AppointmentsDayViewLoader />
  </Fragment>
);
