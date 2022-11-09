const Form = require('../model/Form');
const moment = require('moment');

module.exports = {
  index: async (req, res) => {
    res.render('form', { title: 'Daftar Formulir' })
  },
  addForm: async (req, res) => {
    const dateNow = moment().format("DD/MM/YYYY HH:mm:ss");
    const dateBefore = moment().subtract(3, 'hours').format("DD/MM/YYYY HH:mm:ss");

    res.render('form/add-form', { title: 'Tambah Formulir', dateNow, dateBefore })
  },
  actionAdd: async (req, res) => {
    let {auditorName, auditDate, patientName, eatDate, kh, lh, ln, sn, bh, ea, foodSupply, foodLeft, isFulfilled} = req.body;

    auditDate = moment(auditDate, "DD/MM/YYYY HH:mm:ss", true);
    eatDate = moment(eatDate, "DD/MM/YYYY HH:mm:ss", true);
    foodSupply = parseFloat(foodSupply);
    foodLeft = parseFloat(foodLeft);
    isFulfilled = isFulfilled === 'true';
    const portionLeft = [parseFloat(kh), parseFloat(lh), parseFloat(ln), parseFloat(sn), parseFloat(bh), parseFloat(ea)];

    if (auditDate.toString() === 'Invalid date' || eatDate.toString() === 'Invalid date') {
      return res.status(500).json({text: 'date Invalid'})
    }

    await Form.create({
      auditorName, auditDate, patientName, eatDate, portionLeft, foodSupply, foodLeft, isFulfilled
    })
        .then(r => {
          res.status(200).json({r});
        })
        .catch(e => {

        })
  }
}
