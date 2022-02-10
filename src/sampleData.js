export { sampleAppointments };

const today = new Date();

const at = (hours) => today.setHours(hours, 0);

const sampleAppointments = [
  {
    startsAt: at(9),
    customer: {
      firstName: 'Charlie',
      lastName: 'Smith',
      phoneNumber: '(111) 222-3333',
    },
  },
  {
    startsAt: at(10),
    customer: {
      firstName: 'Frankie',
      lastName: 'Lee',
      phoneNumber: '(222) 333-4444',
    },
  },
  {
    startsAt: at(11),
    customer: {
      firstName: 'Casey',
      lastName: 'Taylor',
      phoneNumber: '(333) 444-5555',
    },
  },
  {
    startsAt: at(12),
    customer: {
      firstName: 'Ashley',
      lastName: 'Garcia',
      phoneNumber: '(444) 555-6666',
    },
  },
  {
    startsAt: at(13),
    customer: {
      firstName: 'Jordan',
      lastName: 'Brown',
      phoneNumber: '(555) 666-7777',
    },
  },
  {
    startsAt: at(14),
    customer: {
      firstName: 'Jay',
      lastName: 'Perez',
      phoneNumber: '(666) 777-8888',
    },
  },
  {
    startsAt: at(15),
    customer: {
      firstName: 'Alex',
      lastName: 'Martinez',
      phoneNumber: '(888) 999-1111',
    },
  },
  {
    startsAt: at(16),
    customer: {
      firstName: 'Jules',
      lastName: 'Gonzalez',
      phoneNumber: '(999) 111-2222',
    },
  },
  {
    startsAt: at(17),
    customer: {
      firstName: 'Stevie',
      lastName: 'Jackson',
      phoneNumber: '(888) 111-2222',
    },
  },
];
