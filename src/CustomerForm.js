export { CustomerForm };

const CustomerForm = ({ firstName, onSubmit }) => {
  const customer = { firstName };

  return (
    <form id='customer' onSubmit={() => onSubmit(customer)}>
      <label htmlFor='firstName'>First name</label>
      <input
        id='firstName'
        type='text'
        name='firstName'
        defaultValue={firstName}
      />
    </form>
  );
};
