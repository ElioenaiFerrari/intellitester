import mongoose from 'mongoose';
import Bcrypt from 'bcryptjs';
import * as R from 'ramda';

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['admin', 'manager', 'user'],
    },
  },
  {
    timestamps: true,
  }
);

schema.pre('save', function (next) {
  const gen_salts = (salts) => Bcrypt.genSaltSync(salts);

  const hash_password = R.curry((password, salts) => {
    return Bcrypt.hashSync(password, salts);
  });

  const update_password = (password_hash) => {
    this.set('password', password_hash);
  };

  const pass_up = () => next();

  R.pipe(
    gen_salts,
    hash_password(this.get('password')),
    update_password,
    pass_up
  )(8);
});

export default mongoose.model('User', schema);
