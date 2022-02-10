import React from 'react';

export { Appointment };

const Appointment = ({ customer: { firstName, lastName, phoneNumber } }) => (
  <table>
    <tbody>
      <tr>
        <td>Customer: </td>
        <td>
          {firstName} {lastName}
        </td>
      </tr>
      <tr>
        <td>Phone number: </td>
        <td>{phoneNumber}</td>
      </tr>
    </tbody>
  </table>
);
