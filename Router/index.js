const express = require('express');
const router = express.Router();

const contactController = require('../Controllers/contacts');

router.get('/contacts', contactController.getcontacts);
router.get('/contacts/:Id', contactController.getcontactsById);
router.post('/contact', contactController.postcontacts);
router.put('/contactupdate/:Id', contactController.updateContacts);
router.delete('/contact/:Id', contactController.deleteContact)

module.exports = router;