import React from 'react';

export { Appointment };

const Appointment = ({ customer: { firstName } }) => <div>{firstName}</div>;
