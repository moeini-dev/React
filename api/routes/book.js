const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/bookController');

router.get('/', bookControllers.getBooks);
router.get('/:isbn', bookControllers.getOneBook);
router.delete('/:isbn', bookControllers.deleteBook);
router.put('/:isbn', bookControllers.updateBook);
router.post('/', bookControllers.addBook);

module.exports = router;