export { AppointmentForm };

const AppointmentForm = ({ selectableServices }) => (
  <form id='appointment'>
    <select name='service'>
      <option />
      {selectableServices.map((service) => (
        <option key={service}>{service}</option>
      ))}
    </select>
  </form>
);

AppointmentForm.defaultProps = {
  selectableServices: [
    'Cut',
    'Blow-dry',
    'Cut & color',
    'Beard trim',
    'Cut & beard trim',
    'Extensions',
  ],
};
