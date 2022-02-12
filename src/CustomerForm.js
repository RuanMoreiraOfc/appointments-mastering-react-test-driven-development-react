export { CustomerForm };

const CustomerForm = ({ firstName }) => (
  <form id='customer'>
    <label htmlFor='firstName'>First name</label>
    <input
      type='text' //
      name='firstName'
      defaultValue={firstName}
    />
  </form>
);
