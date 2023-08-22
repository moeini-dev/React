const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/bookController');
const authController = require('../controllers/authController');

router.get('/', bookControllers.getBooks);
router.get('/:isbn', bookControllers.getOneBook);
router.delete('/:isbn', authController.verify, bookControllers.deleteBook);
router.put('/:isbn', authController.verify, bookControllers.updateBook);
router.post('/', authController.verify, bookControllers.addBook);

module.exports = router;