const moment = require('moment');

module.exports = {
  index: async (req, res) => {
    res.render('home/index', { title: 'Home' })
  }
}
