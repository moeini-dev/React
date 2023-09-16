const express = require('express');
const router = express.Router();
const statsController = require('./../controllers/statsController');
const authController = require('./../controllers/authController');

router.get('/', authController.verify, statsController.getAllStats);

module.exports = router;