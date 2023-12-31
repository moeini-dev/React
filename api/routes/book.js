const express = require('express');
const router = express.Router();
const bookControllers = require('../controllers/bookController');
const authController = require('../controllers/authController');


router.get('/getBooksByPrice', bookControllers.getBooksByPrice)
router.get('/addInitialOrder', bookControllers.addInitialOrder);
router.get('/checkUserBooks', bookControllers.checkUserBooks);
router.post('/pay/:id', bookControllers.pay);
router.get('/', bookControllers.getBooks);
router.get('/featured', bookControllers.getFeaturedBooks)
router.get('/:isbn', bookControllers.getOneBook);
router.delete('/:isbn', authController.verify, bookControllers.deleteBook);
router.put('/:isbn', authController.verify, bookControllers.uploadUpdate, bookControllers.updateBook);
router.post('/addbook', authController.verify, bookControllers.upload, bookControllers.addBook);

module.exports = router;