import React from 'react';

export { Appointment };

const Appointment = ({ customer: { firstName, lastName } }) => (
  <div>
    Customer: {firstName} {lastName}
  </div>
);
