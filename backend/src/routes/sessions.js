const express = require('express');
const router = express.Router();
const { createSession, endSession, getSession } = require('../controllers/sessionController');
const { isAuthenticated } = require('../middleware/auth');

router.post('/', isAuthenticated, createSession);
router.post('/end', isAuthenticated, endSession);
router.get('/:id', isAuthenticated, getSession);

module.exports = router;
