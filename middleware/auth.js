const jwt = require('jsonwebtoken');
const User = require('../model/User')

module.exports = {
  isLoginAdmin: async (req, res, next) => {
    const token = req.cookies.session;

    if (token) {
      jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
        if (err) {
          res.redirect('/auth/signin');
        } else {
          User.findById(decodedToken.user.id)
              .then(() => next())
              .catch(() => res.redirect('/auth/signin'))
        }
      });
    } else {
      res.redirect('/auth/signin');
    }
  },
};
