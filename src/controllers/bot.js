import * as R from 'ramda';
import { request, response } from 'express';
import Send from '@/utils/send';
import Repo from '@/repo';
import Bot from '@/models/bot';

const BotController = {
  store: (req = request, res = response) => {
    Repo.create(Bot, { ...req.body, owner: req.auth.user })
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

    Repo.find(Bot, { _id: id })
      .then(Send.json(res, 200))
      .catch(Send.json(res, 400));
  },

  update: (req = request, res = response) => {
    const { id } = req.params;

    Repo.update(Bot, id, req.body)
      .then(Send.json(res, 200))
      .catch(Send.json(res, 400));
  },

  destroy: (req = request, res = response) => {
    const { id } = req.params;

    Repo.delete(Bot, id, req.body)
      .then(Send.json(res, 200))
      .catch(Send.json(res, 400));
  },
};

export default BotController;
