const Form = require('../model/Form');
const moment = require('moment');
const { Parser } = require('json2csv');
const path = require('path');
const fs = require('fs');

moment.locale('id');

module.exports = {
  index: async (req, res) => {
    const sort = req.query?.sort === 'desc' ? '-createdAt' : 'createdAt'
    const startDate = req.query?.startDate ? moment(req.query.startDate) : moment().startOf('month');
    const endDate = req.query?.endDate ? moment(req.query.endDate) : moment();

    await Form.find({
      createdAt:
          {
            $gte: startDate.startOf('day').format(),
            $lte: endDate.endOf('day').format()
          }
    })
        .sort(sort)
        .then((r) => {
          res.render('form', {
            title: 'Daftar Formulir',
            data: r,
            moment,
            totalForm: r.length,
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: endDate.format('YYYY-MM-DD'),
            nowDate: moment().format('YYYY-MM-DD'),
            sort
          })
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
  },
  exportFormData: async (req, res) => {
    const dateTime = moment().format('YYYYMMDDhhmmss')

    await Form.find({})
        .then(async (r) => {
          const json2csvParser = new Parser();
          const csvParse = await json2csvParser.parse(
              r.map((item) => (
                  {
                    'Nama Auditor': item.auditorName,
                    'Tanggal Audit': moment(item.auditDate).format('LLL'),
                    'Nama Pasien': item.patientName,
                    'Tanggal Makan': moment(item.eatDate).format('LLL'),
                    'Karbohidrat': item.portionLeft[0] === 10 ? '-' : item.portionLeft[0],
                    'Lauk Hewani': item.portionLeft[1] === 10 ? '-' : item.portionLeft[1],
                    'Lauk Nabati': item.portionLeft[2] === 10 ? '-' : item.portionLeft[2],
                    'Sayuran': item.portionLeft[3] === 10 ? '-' : item.portionLeft[3],
                    'Buah': item.portionLeft[4] === 10 ? '-' : item.portionLeft[4],
                    'Extra': item.portionLeft[5] === 10 ? '-' : item.portionLeft[5],
                    'Asupan Makanan': item.foodSupply,
                    'Sisa Makanan': item.foodLeft,
                    'Kategori': item.isFulfilled ? 'Terpenuhi' : 'Tidak Terpenuhi',
                    'Dibuat Pada': moment(item.createdAt).format('LLL'),
                  }
              ))
          )

          const filePath = path.join(
              __dirname,
              '..',
              'public',
              'exports',
              `csv-${dateTime}.csv`
          )

          fs.writeFile(filePath, csvParse, (err) => {
            console.log(err)
            if (err) {
              return res
                  .status(500)
                  .json({ error: true, code: 5000, message: 'Export data error!' });
            }

            return res.status(200).json({
              error: false,
              code: 200,
              data: { link: `/exports/csv-${dateTime}.csv` },
            });
          })
        })
        .catch(() => {
          res.status(500).json({
            error: true,
            code: 5000,
            message: 'database error!',
          });
        });
  }
}
