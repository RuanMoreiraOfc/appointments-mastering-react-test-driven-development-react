import React from 'react';

export { Appointment };

const Appointment = ({ customer: { firstName, lastName } }) => (
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
      </tr>
    </tbody>
  </table>
);
