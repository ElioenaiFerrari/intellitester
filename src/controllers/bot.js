import * as R from 'ramda';
import { request, response } from 'express';
import Send from '@/utils/send';
import Repo from '@/repo';
import Bot from '@/models/bot';

const BotController = {
  store: (req = request, res = response) => {
    Repo.create(Bot, {
      ...req.body,
      owner: req.auth.user,
      team: [req.auth.user],
    })
      .then(Send.json(res, 201))
      .catch(Send.json(res, 400));
  },

  index: (req = request, res = response) => {
    Repo.all(Bot, req.query)
      .then(Send.json(res, 200))
      .catch(Send.json(res, 400));
  },

  show: (req = request, res = response) => {
    const { id } = req.params;

    Repo.find(Bot, { _id: id, team: req.auth.user })
      .then(
        R.ifElse(
          R.isNil,
          () => Send.json(res, 401, { error: 'unauthorized' }),
          Send.json(res, 200)
        )
      )
      .catch(Send.json(res, 400));
  },

  update: (req = request, res = response) => {
    const { id } = req.params;

    const add_user_to_team = R.ifElse(
      R.has('user'),
      (body) => ({ $push: { team: body.user } }),
      () => ({})
    );

    Repo.update(
      Bot,
      { _id: id, owner: req.auth.user },
      { ...req.body, ...add_user_to_team(req.body) }
    )
      .then(
        R.ifElse(
          R.isNil,
          () => Send.json(res, 401, { error: 'unauthorized' }),
          Send.json(res, 200)
        )
      )
      .catch(Send.json(res, 400));
  },

  destroy: (req = request, res = response) => {
    const { id } = req.params;

    Repo.delete(Bot, { _id: id }, req.body)
      .then(Send.json(res, 200))
      .catch(Send.json(res, 400));
  },
};

export default BotController;
