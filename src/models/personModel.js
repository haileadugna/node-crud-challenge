
let database = [
  {
    id: '1',
    name: 'Haile Adugna',
    age: 24,
    hobbies: ['football', 'movies', 'reading', 'coding']
  }
];

const getAllPersons = () => {
  return database;
};

const getPersonById = (personId) => {
  return database.find(person => person.id === personId);
};

const addPerson = (newPerson) => {
  database.push(newPerson);
};

const updatePerson = (personId, updatedPerson) => {
  const personIndex = database.findIndex(person => person.id === personId);
  if (personIndex !== -1) {
    database[personIndex] = { ...database[personIndex], ...updatedPerson };
    return database[personIndex];
  }
  return null;
};

const deletePerson = (personId) => {
  const personIndex = database.findIndex(person => person.id === personId);
  if (personIndex !== -1) {
    const deletedPerson = database.splice(personIndex, 1);
    return deletedPerson[0];
  }
  return null;
};

module.exports = { getAllPersons, getPersonById, addPerson, updatePerson, deletePerson };
