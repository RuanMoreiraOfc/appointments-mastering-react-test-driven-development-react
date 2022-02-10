import React from 'react';

export { Appointment };

const Appointment = ({ customer: { firstName, lastName } }) => (
  <table>
    <tbody>
      <tr>
        <td>
          Customer: {firstName} {lastName}
        </td>
      </tr>
    </tbody>
  </table>
);
