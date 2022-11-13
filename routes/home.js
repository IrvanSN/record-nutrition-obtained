const express = require('express');
const {index} = require("../controller/home");
const {isLoginAdmin} = require("../middleware/auth");
const router = express.Router();

router.get('/', isLoginAdmin, index);

module.exports = router;
