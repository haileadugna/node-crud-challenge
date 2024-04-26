const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');

const app = express();
app.use(express.json());

const database = [
  {
    id: '1',
    name: 'Haile Adugna',
    age: 24,
    hobbies: ['dubstep', 'movies', 'reading', 'coding']
  }
];

app.set('db', database);

// Joi schema for request body validation
const personSchema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().integer().required(),
  hobbies: Joi.array().items(Joi.string()).default([]),
});

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Get all persons or person by id
app.get('/person/:personId?', (req, res) => {
  const { personId } = req.params;
  if (personId) {
    const person = database.find(person => person.id === personId);
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ message: 'Person not found' });
    }
  } else {
    res.json(database);
  }
});

// Create new person
app.post('/person', (req, res) => {
  const { error } = personSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, age, hobbies } = req.body;

  const id = uuidv4();
  const newPerson = { id, name, age, hobbies };
  database.push(newPerson);
  res.status(200).json(newPerson);
});

// Update person
app.put('/person/:personId', (req, res) => {
  const { personId } = req.params;
  const { error } = personSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, age, hobbies } = req.body;
  const personIndex = database.findIndex(person => person.id === personId);
  if (personIndex === -1) {
    return res.status(404).json({ message: 'Person not found' });
  }

  database[personIndex] = { ...database[personIndex], name, age, hobbies };
  res.json(database[personIndex]);
});

// Delete person
app.delete('/person/:personId', (req, res) => {
  const { personId } = req.params;
  const personIndex = database.findIndex(person => person.id === personId);
  if (personIndex === -1) {
    return res.status(404).json({ message: 'Person not found' });
  }

  database.splice(personIndex, 1);
  res.json({ message: 'Person deleted successfully' });
});

// Handle non-existing endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Handle internal server errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;
