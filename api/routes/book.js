const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/bookController');

router.get('/', bookControllers.getBooks);
router.delete('/:isbn', bookControllers.deleteBook);
router.post('/', bookControllers.addBook);

module.exports = router;