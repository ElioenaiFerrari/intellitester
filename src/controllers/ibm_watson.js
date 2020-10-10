import IbmWatson from '@/services/ibm_watson';
import * as R from 'ramda';
import { request, response } from 'express';
import Send from '@/utils/send';

const i2ai_bot_params = {
  apikey: 'RoUhQXG4qFsTVgilkTshuVM9W3vcmCH3fYu2CbHvm8Ls',
  service_url:
    'https://api.us-south.assistant.watson.cloud.ibm.com/instances/727afc57-4037-4819-8a39-9b3c1c0b237e',
  skill_id: '719164c2-fef7-4811-ba99-d79975782bd9',
};

const arcelor_bot_params = {
  apikey: 'b0HRDFp-2Vrc_uwS1PRIEefXSHP2o1hZSQ_LeHvB16dU',
  service_url:
    'https://api.us-south.assistant.watson.cloud.ibm.com/instances/24728456-83bb-4a63-8492-e680ea000ebd',
  skill_id: 'a1e1fc4b-c91a-4664-bf41-0dfd68ce151d',
};

const IbmWatsonController = {
  send_message: (req = request, res = response) => {
    const { input, context } = req.body;

    const ibm_watson = IbmWatson.create(arcelor_bot_params);

    ibm_watson
      .message({
        workspaceId: arcelor_bot_params.skill_id,
        input,
        context,
      })
      .then(R.pipe(R.prop('result'), Send.json(res, 200)))
      .catch(Send.json(res, 400));
  },
};

export default IbmWatsonController;
