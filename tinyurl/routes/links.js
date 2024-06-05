const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

router.post('/', linkController.createLink);
router.get('/', linkController.getLinks);
router.get('/:id', linkController.getLink);
router.put('/:id', linkController.updateLink);
router.delete('/:id', linkController.deleteLink);
router.get('/r/:id', linkController.redirectLink);
router.get('/stats/:id', linkController.getLinkStats); // route חדש לסטטיסטיקות

module.exports = router;
