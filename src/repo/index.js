import * as R from 'ramda';

const Repo = {
  all: R.curry((model, params = null) => {
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

  delete: R.curry((model, by) => {
    return Promise.resolve(model.findOneAndDelete(by))
      .then(R.always)
      .catch(R.always)
      .then(R.call);
  }),

  update: R.curry((model, by, params) => {
    return Promise.resolve(model.findOneAndUpdate(by, params, { new: true }))
      .then(R.always)
      .catch(R.always)
      .then(R.call);
  }),
};

export default Repo;
