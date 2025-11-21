const express = require('express');
const router = express.Router();
const { upload, getResources, updateResource, deleteResource } = require('../controllers/resourcesController');
const { isAuthenticated } = require('../middleware/auth');

router.post('/', isAuthenticated, upload);
router.get('/', getResources);
router.put('/:id', isAuthenticated, updateResource);
router.delete('/:id', isAuthenticated, deleteResource);

module.exports = router;
