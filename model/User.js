const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    }
);

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (!user) {
    throw Error('Email/Password Salah!');
  }

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    throw Error('Email/Password Salah!');
  }

  return user;
};

const User = mongoose.model('user', userSchema);
module.exports = User;
