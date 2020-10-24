const Bcrypt = require('bcryptjs');
const { default: Env } = require('./env');

const Secret = {
  gen: () => {
    const salts = Bcrypt.genSaltSync(8);
    const key = Bcrypt.hashSync(Env.get('APP_SECRET'), salts);

    return Env.set('APP_SECRET', key);
  },
};

module.exports = Secret;
