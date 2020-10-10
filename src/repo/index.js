import * as R from 'ramda';

const Repo = {
  all: R.curry((model, params) => {
    return Promise.resolve(model.find(params))
      .then(R.always)
      .catch(R.always)
      .then(R.call);
  }),

  find: R.curry((model, params) => {
    return Promise.resolve(model.findOne(params))
      .then(R.always)
      .catch(R.always)
      .then(R.call);
  }),

  create: R.curry((model, params) => {
    return Promise.resolve(model.create(params))
      .then(R.always)
      .catch(R.always)
      .then(R.call);
  }),
};

export default Repo;
