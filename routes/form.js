const express = require('express');
const {index, addForm} = require("../controller/form");

const router = express.Router();

router.get('/', index)
router.get('/add', addForm)

module.exports = router;
