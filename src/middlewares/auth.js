import { request, response } from 'express';
import * as R from 'ramda';
import Send from '@/utils/send';
import jwt from 'jsonwebtoken';
import Env from '@/config/env';

const AuthMiddleware = {
  check: (req = request, res = response, next) => {
    const get_authorization = R.pipe(
      R.prop('headers'),
      R.prop('authorization')
    );

    const has_authorization = R.pipe(R.prop('headers'), R.has('authorization'));
    const is_valid_token = (data) => R.equals(R.length(data), 2);
    const decode_token = (token) => jwt.verify(token[0], Env.get('APP_SECRET'));
    const store_user = R.curry((req, user) => (req.auth = user));
    const pass_up = () => next();

    const is_authorized = R.ifElse(
      has_authorization,
      R.pipe(
        get_authorization,
        R.split(' '),
        R.ifElse(
          is_valid_token,
          R.pipe(R.takeLast(1), decode_token, store_user(req), pass_up),
          () => Send.json(res, 401, { error: 'invalid token' })
        )
      ),
      () => Send.json(res, 401, { error: 'unauthorized' })
    );

    R.tryCatch(is_authorized, Send.json(res, 400))(req);
  },
};

export default AuthMiddleware;
