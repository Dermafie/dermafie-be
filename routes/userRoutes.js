const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');


router.get('/:id', UserController.getUserById);

router.post('/register', UserController.createUser);

module.exports = router;