const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');

router.get('/', userControllers.getUsers);
router.post('/', userControllers.createUser);
router.get('/:uuid', userControllers.getUserByUuid);
router.put('/:uuid', userControllers.editUser);


module.exports = router;