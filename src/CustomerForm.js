import { useState } from 'react';

export { CustomerForm };

const CustomerForm = ({ firstName, onSubmit }) => {
  const [customer, setCustomer] = useState({ firstName });

  return (
    <form id='customer' onSubmit={() => onSubmit(customer)}>
      <label htmlFor='firstName'>First name</label>
      <input
        id='firstName'
        type='text'
        name='firstName'
        defaultValue={firstName}
        onChange={({ target: { value } }) =>
          setCustomer((oldState) => ({ ...oldState, firstName: value }))
        }
      />
    </form>
  );
};
