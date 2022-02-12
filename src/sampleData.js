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
      stylist: 'Maggie',
      service: 'Cut',
      notes: 'Do not use a hair clipper',
    },
  },
  {
    startsAt: at(10),
    customer: {
      firstName: 'Frankie',
      lastName: 'Lee',
      phoneNumber: '(222) 333-4444',
      stylist: 'Mario',
      service: 'Beard trim',
      notes: 'None',
    },
  },
  {
    startsAt: at(11),
    customer: {
      firstName: 'Casey',
      lastName: 'Taylor',
      phoneNumber: '(333) 444-5555',
      stylist: 'Bruna',
      service: 'Dye',
      notes: 'Customer with oily hair',
    },
  },
  {
    startsAt: at(12),
    customer: {
      firstName: 'Ashley',
      lastName: 'Garcia',
      phoneNumber: '(444) 555-6666',
      stylist: 'Mark',
      service: 'Dye',
      notes: 'Purple color',
    },
  },
  {
    startsAt: at(13),
    customer: {
      firstName: 'Jordan',
      lastName: 'Brown',
      phoneNumber: '(555) 666-7777',
      stylist: 'Julia',
      service: 'Beard dye',
      notes: 'Gray-haired color',
    },
  },
  {
    startsAt: at(14),
    customer: {
      firstName: 'Jay',
      lastName: 'Perez',
      phoneNumber: '(666) 777-8888',
      stylist: 'Marcia',
      service: 'Cut',
      notes: 'Use only hair clipper',
    },
  },
  {
    startsAt: at(15),
    customer: {
      firstName: 'Alex',
      lastName: 'Martinez',
      phoneNumber: '(888) 999-1111',
      stylist: 'John',
      service: 'Beard trim',
      notes: 'Do no use a hair clipper',
    },
  },
  {
    startsAt: at(16),
    customer: {
      firstName: 'Jules',
      lastName: 'Gonzalez',
      phoneNumber: '(999) 111-2222',
      stylist: 'Marta',
      service: 'Cut',
      notes: 'None',
    },
  },
  {
    startsAt: at(17),
    customer: {
      firstName: 'Stevie',
      lastName: 'Jackson',
      phoneNumber: '(888) 111-2222',
      stylist: 'Michael',
      service: 'Dye',
      notes: 'Red color',
    },
  },
];
