import { useState } from 'react';

export { CustomerForm };

const CustomerForm = ({ firstName, onSubmit }) => {
  const [customer, setCustomer] = useState({ firstName });

  const handleTextFieldChange = (field) => (event) =>
    setCustomer((oldState) => ({
      ...oldState,
      [field]: event.target.value, //
    }));

  return (
    <form id='customer' onSubmit={() => onSubmit(customer)}>
      <label htmlFor='firstName'>First name</label>
      <input
        id='firstName'
        type='text'
        name='firstName'
        defaultValue={firstName}
        onChange={handleTextFieldChange('firstName')}
      />
      <input
        type='text' //
        name='lastName'
      />
    </form>
  );
};
