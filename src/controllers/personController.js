const { v4: uuidv4 } = require('uuid');
const personModel = require('../models/personModel');

// Get all persons or person by id
const getPerson = (req, res) => {
  const { personId } = req.params;
  if (personId) {
    const person = personModel.getPersonById(personId);
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ message: 'Person not found' });
    }
  } else {
    res.json(personModel.getAllPersons());
  }
};

// Create new person
const createPerson = (req, res) => {
  const { name, age, hobbies } = req.body;
  if (!name || !age) {
    return res.status(400).json({ message: 'Name and age are required' });
  }

  const id = uuidv4();
  const newPerson = { id, name, age, hobbies: hobbies || [] };
  personModel.addPerson(newPerson);
  res.status(200).json(newPerson);
};

// Update person
const updatePerson = (req, res) => {
  const { personId } = req.params;
  const { name, age, hobbies } = req.body;
  const updatedPerson = personModel.updatePerson(personId, { name, age, hobbies });
  if (updatedPerson) {
    res.json(updatedPerson);
  } else {
    res.status(404).json({ message: 'Person not found' });
  }
};

// Delete person
const deletePerson = (req, res) => {
  const { personId } = req.params;
  const deletedPerson = personModel.deletePerson(personId);
  if (deletedPerson) {
    res.json({ message: 'Person deleted successfully' });
  } else {
    res.status(404).json({ message: 'Person not found' });
  }
};

module.exports = { getPerson, createPerson, updatePerson, deletePerson };
