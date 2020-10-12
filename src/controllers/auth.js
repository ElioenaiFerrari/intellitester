import { request, response } from 'express';
import Repo from '@/repo';
import * as R from 'ramda';
import User from '@/models/user';
import Send from '@/utils/send';
import Bcrypt from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import Env from '@/config/env';

const AuthController = {
  signup: (req = request, res = response, next) => {
    Repo.create(User, req.body)
      .then(Send.json(res, 201))
      .catch(Send.json(res, 400));
  },

  signin: (req = request, res = response, next) => {
    const { email, password } = req.body;

    const compare_hash = R.curry((password, hash) => {
      return Bcrypt.compareSync(password, hash);
    });

    const check_credentials = (user) => {
      return R.ifElse(
        compare_hash(password),
        () => ({ token: gen_token({ user }) }),
        () => Send.json(res, 400, { error: 'invalid credentials' })
      )(user.password);
    };

    const gen_token = (data) => {
      return Jwt.sign(data, Env.get('APP_SECRET'));
    };

    const send_result = R.ifElse(
      R.has('token'),
      Send.json(res, 200),
      Send.json(res, 400)
    );

    Repo.find(User, { email })
      .then(check_credentials)
      .then(send_result)
      .catch(Send.json(res, 400));
  },
};

export default AuthController;
