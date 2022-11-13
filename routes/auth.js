const express = require('express');
const {index, actionSignIn, actionSignup, actionSignout} = require("../controller/auth");

const router = express.Router();

router.get('/signin', index)
router.post('/signin', actionSignIn)
router.post('/signup', actionSignup)
router.get('/logout', actionSignout)

module.exports = router;
