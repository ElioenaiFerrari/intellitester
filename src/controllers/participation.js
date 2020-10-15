import * as R from 'ramda';
import { request, response } from 'express';
import Send from '@/utils/send';
import Repo from '@/repo';
import Participation from '@/models/participation';
import Bot from '@/models/bot';

const ParticipationController = {
  store: (req = request, res = response) => {
    const { bot_id } = req.body;

    const store_participation = (bot) => {
      return Promise.resolve(
        Repo.create(Participation, { ...req.body, bot, from: req.auth.user })
      );
    };

    Repo.find(Bot, { _id: bot_id })
      .then(store_participation)
      .then(Send.json(res, 201))
      .catch(Send.json(res, 400));
  },

  index: (req = request, res = response) => {
    Repo.all(Participation, req.query, { populate: ['bot', 'for', 'to'] })
      .then(Send.json(res, 200))
      .catch(Send.json(res, 400));
  },

  update: (req = request, res = response) => {
    const { id } = req.params;

    const add_user_to_team = R.curry((bot, user) => {
      return Promise.resolve(
        Repo.update(Bot, { _id: bot }, { $push: { team: user } })
      );
    });

    const participation_response = R.ifElse(
      R.propEq('status', 'ACCEPTED'),
      ({ bot, from }) => add_user_to_team(bot, from),
      () => Send.json(res, 200, { message: 'you request has rejected' })
    );

    Repo.update(Participation, { _id: id }, req.body)
      .then(R.pipe(participation_response))
      .then(Send.json(res, 200))
      .catch(Send.json(res, 400));
  },

  // destroy: (req = request, res = response) => {
  //   const { id } = req.params;

  //   Repo.delete(Participation, { _id: id }, req.body)
  //     .then(Send.json(res, 200))
  //     .catch(Send.json(res, 400));
  // },
};

export default ParticipationController;
