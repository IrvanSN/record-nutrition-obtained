const Form = require('../model/Form')

module.exports = {
  index: async (req, res) => {
    Form.aggregate([
      { $unwind: "$isFulfilled" },
      {
        $group: {
          _id: "$isFulfilled",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },

    ]).then(r => {
      const fulfilled = r.find(x => x._id === true).count
      const notFulfilled = r.find(x => x._id === false).count

      res.render('home/index', { title: 'Home', fulfilled, notFulfilled, sum: fulfilled + notFulfilled })
    })
  }
}
