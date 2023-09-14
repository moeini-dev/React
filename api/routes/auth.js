const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authController');

router.post('/login', authControllers.login);
router.get('/logout', authControllers.logout);
router.post('/refresh', authControllers.verify, authControllers.refresh);


module.exports = router;