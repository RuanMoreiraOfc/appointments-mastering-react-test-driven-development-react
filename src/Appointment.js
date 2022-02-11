import React from 'react';

export { Appointment };

const Appointment = ({
  customer: {
    firstName, //
    lastName,
    phoneNumber,
    stylist,
  },
}) => (
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
      <tr>
        <td>Stylist: </td>
        <td>{stylist}</td>
      </tr>
      <tr>
        <td>Service: </td>
        <td>Cut</td>
      </tr>
    </tbody>
  </table>
);
