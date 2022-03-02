import { useState } from 'react';

export { CustomerForm };

const CustomerForm = ({
  firstName, //
  lastName,
  phoneNumber,
  onSave,
}) => {
  const [error, setError] = useState(false);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await window.fetch('/customers', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customer),
    });

    if (response.ok === true) {
      const data = await response.json();
      onSave(data);
    } else {
      setError(true);
    }
  };

  return (
    <form id='customer' onSubmit={handleSubmit}>
      {error ? <ErrorMessage /> : null}
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
  onSave: () => {},
};

const ErrorMessage = () => (
  <div className='error'>An error occurred during save.</div>
);
