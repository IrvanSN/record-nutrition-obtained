module.exports = {
  index: async (req, res) => {
    res.render('form', { title: 'Daftar Formulir' })
  },
  addForm: async (req, res) => {
    res.render('form/add-form', { title: 'Tambah Formulir' })
  },
  actionAdd: async (req, res) => {

  }
}
