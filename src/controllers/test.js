import { request, response } from 'express';
import * as R from 'ramda';
import Test from '@/models/test';
import Bot from '@/models/bot';
import Repo from '@/repo';
import Send from '@/utils/send';

const TestController = {
  index: (req = request, res = response) => {
    const { bot_id } = req.params;

    Repo.all(Test, { bot: bot_id })
      .then(Send.json(res, 200))
      .catch(Send.json(res, 400));
  },

  store: (req = request, res = response) => {
    const { bot_id } = req.params;

    const find_bot = (_id) => {
      return Repo.find(Bot, { _id })
        .then(R.pipe(R.always, R.call))
        .catch(Send.json(res, 400));
    };

    const create_test = (bot) => {
      console.log(bot);
      return Repo.create(Test, { ...req.body, owner: req.auth.user, bot })
        .then(Send.json(res, 200))
        .catch(Send.json(res, 400));
    };

    R.pipe(
      find_bot,
      R.ifElse(R.andThen(R.has('id')), R.andThen(create_test), () =>
        Send.json(res, 404, { error: 'bot not found' })
      )
    )(bot_id);
  },

  update: (req = request, res = response) => {
    const { bot_id } = req.params;

    Repo.find(Bot, { _id: bot_id })
      .then(Send.json(res, 200))
      .catch(Send.json(res, 400));
  },
};

export default TestController;
