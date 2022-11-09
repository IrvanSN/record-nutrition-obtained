const express = require('express');
const {
  index,
  viewAddForm,
  actionAdd,
  viewEdit,
  actionDelete,
  actionEdit
} = require("../controller/form");

const router = express.Router();

router.get('/', index)
router.get('/add', viewAddForm)
router.post('/add', actionAdd)
router.get('/:id/edit', viewEdit)
router.post('/:id/edit', actionEdit)
router.post('/:id/delete', actionDelete)

module.exports = router;
