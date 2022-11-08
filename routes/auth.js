const express = require('express');
const {index, actionSignIn, actionSignup} = require("../controller/auth");

const router = express.Router();

router.get('/', index)
router.post('/signin', actionSignIn)
router.post('/signup', actionSignup)

module.exports = router;
