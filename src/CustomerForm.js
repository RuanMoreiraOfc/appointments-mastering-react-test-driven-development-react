export { CustomerForm };

const CustomerForm = ({ firstName }) => (
  <form id='customer'>
    <input
      type='text' //
      name='firstName'
      defaultValue={firstName}
    />
  </form>
);
