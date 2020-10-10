import AssistantV1 from 'ibm-watson/assistant/v1';
import { IamAuthenticator } from 'ibm-watson/auth';

const IbmWatson = {
  create: ({
    apikey,
    service_url,
    version = '2020-09-10',
    disable_ssl_verification = true,
  }) => {
    return new AssistantV1({
      authenticator: new IamAuthenticator({ apikey }),
      serviceUrl: service_url,
      version,
      disableSslVerification: disable_ssl_verification,
    });
  },
};

export default IbmWatson;
