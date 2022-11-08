const express = require('express');
const {index} = require("../controller/home");
const router = express.Router();

router.get('/', index);

module.exports = router;
