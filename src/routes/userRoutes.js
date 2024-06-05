const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');


// router.get('/:id', UserController.getUserById);

router.post('/register', UserController.createUser);

router.post('/login', UserController.login);

router.get('/profile', authenticate, UserController.getProfile);

module.exports = router;