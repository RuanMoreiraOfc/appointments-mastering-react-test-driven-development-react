import { Fragment } from 'react';

import { AppointmentsDayViewLoader } from './AppointmentsDayViewLoader';

export { App };

const App = () => (
  <Fragment>
    <div className='button-bar'>
      <button type='button' id='addCustomer'>
        Add customer and appointment
      </button>
    </div>
    <AppointmentsDayViewLoader />
  </Fragment>
);
