export { AppointmentForm };

const AppointmentForm = ({
  selectableServices, //
  service,
  onSubmit,
}) => (
  <form id='appointment' onSubmit={() => onSubmit({ service })}>
    <label htmlFor='service'>Service</label>
    <select
      id='service' //
      name='service'
      defaultValue={service}
    >
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
