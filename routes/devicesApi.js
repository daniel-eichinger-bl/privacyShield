const express = require('express');
const router = express.Router();

const controller = require('../controllers/deviceController')

router.get('/', controller.getDevices);

module.exports = router;