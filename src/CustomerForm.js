import { useState } from 'react';

export { CustomerForm };

const CustomerForm = ({
  firstName, //
  lastName,
  phoneNumber,
  onSubmit,
  fetch,
}) => {
  const [customer, setCustomer] = useState({
    firstName,
    lastName,
    phoneNumber,
  });

  const handleTextFieldChange = (field) => (event) =>
    setCustomer((oldState) => ({
      ...oldState,
      [field]: event.target.value, //
    }));

  const handleSubmit = () => {
    onSubmit(customer);

    fetch('/customers', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return (
    <form id='customer' onSubmit={handleSubmit}>
      <label htmlFor='firstName'>First name</label>
      <input
        id='firstName'
        type='text'
        name='firstName'
        defaultValue={firstName}
        onChange={handleTextFieldChange('firstName')}
      />
      <label htmlFor='lastName'>Last name</label>
      <input
        id='lastName'
        type='text'
        name='lastName'
        defaultValue={lastName}
        onChange={handleTextFieldChange('lastName')}
      />
      <label htmlFor='phoneNumber'>Phone number</label>
      <input
        id='phoneNumber'
        type='text'
        name='phoneNumber'
        defaultValue={phoneNumber}
        onChange={handleTextFieldChange('phoneNumber')}
      />
      <input type='submit' value='Add' />
    </form>
  );
};

CustomerForm.defaultProps = {
  fetch: async () => {},
};
