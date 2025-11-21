const express = require('express');
const router = express.Router();
const { addEntry, getJournal, updateEntry, deleteEntry } = require('../controllers/journalController');
const { isAuthenticated } = require('../middleware/auth');

router.post('/entry', isAuthenticated, addEntry);
router.get('/', isAuthenticated, getJournal);
router.put('/:id', isAuthenticated, updateEntry);
router.delete('/:id', isAuthenticated, deleteEntry);

module.exports = router;