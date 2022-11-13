const express = require('express');
const {
  index,
  viewAddForm,
  actionAdd,
  viewEdit,
  actionDelete,
  actionEdit
} = require("../controller/form");
const {isLoginAdmin} = require("../middleware/auth");

const router = express.Router();

router.get('/', isLoginAdmin, index)
router.get('/add', isLoginAdmin, viewAddForm)
router.post('/add', isLoginAdmin, actionAdd)
router.get('/:id/edit', isLoginAdmin, viewEdit)
router.post('/:id/edit', isLoginAdmin, actionEdit)
router.post('/:id/delete', isLoginAdmin, actionDelete)

module.exports = router;
