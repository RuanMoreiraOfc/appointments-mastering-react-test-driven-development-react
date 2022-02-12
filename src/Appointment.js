export { Appointment };

const Appointment = ({
  customer: {
    firstName, //
    lastName,
    phoneNumber,
    stylist,
    service,
    notes,
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
        <td>{service}</td>
      </tr>
      <tr>
        <td>Notes: </td>
        <td>{notes}</td>
      </tr>
    </tbody>
  </table>
);
