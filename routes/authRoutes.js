const express = require('express');
const router = express.Router();
const { register ,getProfile,updateUser} = require('../controllers/authController');

router.post('/register', register);
router.get('/profile/:userId', getProfile);
router.put('/users/:userId', updateUser);

module.exports = router;
