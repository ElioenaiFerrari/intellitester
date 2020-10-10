import * as R from 'ramda';

const Send = {
  json: R.curry((res, status, json) => res.status(status).json(json)),
  file: R.curry((res, type, file) => {
    res.contentType(type);

    return res.status(200).send(file);
  }),
};

export default Send;
