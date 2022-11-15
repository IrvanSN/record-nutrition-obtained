const Form = require('../model/Form');
const moment = require('moment');

module.exports = {
  index: async (req, res) => {

    await Form.find({})
        .then((r) => {
          res.render('form', { title: 'Daftar Formulir', data: r, moment })
        })
  },
  viewAddForm: async (req, res) => {
    const auditDate = moment().format("DD/MM/YYYY HH:mm:ss");
    const eatDate = moment().subtract(3, 'hours').format("DD/MM/YYYY HH:mm:ss");
    const data = {
      roomName: '',
      auditorName: '',
      patientName: '',
      portionLeft: [10, 10, 10, 10, 10, 10]
    }

    res.render('form/add-form', { title: 'Tambah Formulir', auditDate, eatDate, data })
  },
  actionAdd: async (req, res) => {
    let {roomName, auditorName, auditDate, patientName, eatDate, kh, lh, ln, sn, bh, ea, foodSupply, foodLeft, isFulfilled} = req.body;

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
      roomName, auditorName, auditDate, patientName, eatDate, portionLeft, foodSupply, foodLeft, isFulfilled
    })
        .then(r => {
          res.redirect('/form');
        })
        .catch(e => {
          res.redirect('/form');
        })
  },
  viewEdit: async (req, res) => {
    const { id } = req.params;

    Form.findById(id)
        .then(r => {
          let { auditDate, eatDate } = r
          auditDate = moment(auditDate).format("DD/MM/YYYY HH:mm:ss");
          eatDate = moment(eatDate).format("DD/MM/YYYY HH:mm:ss");

          res.render('form/add-form', { title: 'Edit Formulir', data: r, auditDate, eatDate, moment })
        })
        .catch(r => {
          res.redirect('/form');
        })
  },
  actionEdit: async (req, res) => {
    const { id } = req.params;
    let {roomName, auditorName, auditDate, patientName, eatDate, kh, lh, ln, sn, bh, ea, foodSupply, foodLeft, isFulfilled} = req.body;
    console.log(req.body)
    auditDate = moment(auditDate, "DD/MM/YYYY HH:mm:ss", true);
    eatDate = moment(eatDate, "DD/MM/YYYY HH:mm:ss", true);
    foodSupply = parseFloat(foodSupply);
    foodLeft = parseFloat(foodLeft);
    isFulfilled = isFulfilled === 'true';
    const portionLeft = [parseFloat(kh), parseFloat(lh), parseFloat(ln), parseFloat(sn), parseFloat(bh), parseFloat(ea)];

    if (auditDate.toString() === 'Invalid date' || eatDate.toString() === 'Invalid date') {
      return res.status(500).json({text: 'date Invalid'})
    }

    Form.findByIdAndUpdate(id, {
      roomName, auditorName, auditDate, patientName, eatDate, portionLeft, foodSupply, foodLeft, isFulfilled
    })
        .then(r => {
          res.redirect('/form');
        })
        .catch(e => {
          res.redirect('/form');
        })
  },
  actionDelete: async (req, res) => {
    const { id } = req.params;

    Form.findByIdAndDelete(id)
        .then(r => {
          res.redirect('/form');
        })
        .catch(e => {
          res.redirect('/form');
        })
  }
}
