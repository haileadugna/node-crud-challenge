const express = require('express');
const router = express.Router();
const personController = require('../controllers/personController');

// Get all persons or person by id
router.get('/:personId?', personController.getPerson);

// Create new person
router.post('/', personController.createPerson);

// Update person
router.put('/:personId', personController.updatePerson);

// Delete person
router.delete('/:personId', personController.deletePerson);

module.exports = router;
