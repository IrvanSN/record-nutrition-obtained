const express = require('express');
const {index, addForm, actionAdd} = require("../controller/form");

const router = express.Router();

router.get('/', index)
router.get('/add', addForm)
router.post('/add', actionAdd)

module.exports = router;
