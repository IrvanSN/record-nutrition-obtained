const User = require('../model/User')
const jwt = require('jsonwebtoken')

module.exports = {
  index: (req, res) => {
    res.render('auth/index', {title: 'Auth'})
  },
  actionSignIn: async (req, res) => {
    const { username, password } = req.body;
    const tokenExpires = 3 * 24 * 60 * 60;

    await User.login(username, password)
        .then((r) => {
          const token = jwt.sign(
              {
                user: {
                  id: r._id,
                  username: r.username,
                },
              },
              process.env.JWT_KEY,
              { expiresIn: tokenExpires },
          );

          res.cookie('session', token, {
            httpOnly: true,
            maxAge: tokenExpires * 1000,
          });
          res.redirect('/');
        })
        .catch(() => {
          res.redirect('/auth');
        });
  },
  actionSignout: (req, res) => {
    res.cookie('session', '', { maxAge: 1 });
    res.redirect('/auth/signin');
  },
  actionSignup: (req, res) => {
    const { username, password } = req.body;

    User.create({ username, password }).then((r) => {
      console.log(r);
    });
  },
}
