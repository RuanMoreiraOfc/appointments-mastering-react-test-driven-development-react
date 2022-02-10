import React from 'react';

export { Appointment };

const Appointment = ({ customer: { firstName, lastName } }) => (
  <div>
    {firstName} {lastName}
  </div>
);
