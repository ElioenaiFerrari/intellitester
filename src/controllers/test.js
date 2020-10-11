import { request, response } from 'express';
import * as R from 'ramda';
import Test from '@/models/test';
import Bot from '@/models/bot';
import Repo from '@/repo';
import Send from '@/utils/send';
import IbmWatson from '@/services/ibm_watson';

const i2ai_bot_params = {
  apikey: 'RoUhQXG4qFsTVgilkTshuVM9W3vcmCH3fYu2CbHvm8Ls',
  service_url:
    'https://api.us-south.assistant.watson.cloud.ibm.com/instances/727afc57-4037-4819-8a39-9b3c1c0b237e',
  skill_id: '719164c2-fef7-4811-ba99-d79975782bd9',
};

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
      return Repo.create(Test, { ...req.body, owner: req.auth.user, bot })
        .then(Send.json(res, 200))
        .catch(Send.json(res, 400));
    };

    R.pipe(
      find_bot,
      R.ifElse(R.andThen(R.has('_id')), R.andThen(create_test), () =>
        Send.json(res, 404, { error: 'bot not found' })
      )
    )(bot_id);
  },

  update: (req = request, res = response) => {
    const { bot_id } = req.params;
    const { asks, test_id, expected_node } = req.body;

    const get_received_nodes = R.pipe(
      R.prop('result'),
      R.prop('context'),
      R.prop('system'),
      R.prop('dialog_stack'),
      (received_nodes) => received_nodes[0],
      R.values
    );

    const mount_object = R.curry((ask, { expected_node }, received_node) => ({
      ask,
      node: received_node[0],
      ok: expected_node === received_node[0],
    }));

    const send_message = R.curry((params, test, ask) => {
      return IbmWatson.create(params)
        .message({
          workspaceId: params.skill_id,
          input: {
            text: ask,
          },
          context: {},
        })
        .then(R.pipe(get_received_nodes, mount_object(ask, test)));
    });

    const go_through_asks = (params) => {
      return Repo.find(Test, { _id: test_id }).then((test) =>
        Promise.all([...asks].map(send_message(params, test)))
      );
    };

    const save_test = (answers, status) => {
      return Repo.update(
        Test,
        { _id: test_id, bot: bot_id },
        { answers, status, expected_node }
      );
    };

    const verify_content = (answers) => {
      return R.pipe(
        R.find(R.propEq('ok', false)),
        R.ifElse(
          R.has('node'),
          () => save_test(answers, 'BROKEN'),
          () => save_test(answers, 'RIGHT')
        )
      )(answers);
    };

    Repo.find(Bot, { _id: bot_id })
      .then(
        R.pipe(
          go_through_asks,
          R.andThen(verify_content),
          R.andThen(Send.json(res, 200))
        )
      )
      .catch(Send.json(res, 400));
  },
};

export default TestController;
