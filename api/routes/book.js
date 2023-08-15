const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/bookController');

router.get('/', bookControllers.getBooks);


module.exports = router;