const express = require('express');
const router = express.Router();

const controller = require('../controllers/deviceController')

router.get('/', controller.getDevices);
router.post('/block', controller.toggleBlock);
router.post('/updateName', controller.updateName);

module.exports = router;