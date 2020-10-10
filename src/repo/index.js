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

  delete: R.curry((model, id, params) => {
    return Promise.resolve(model.findOneAndDelete({ _id: id }.params))
      .then(R.always)
      .catch(R.always)
      .then(R.call);
  }),

  update: R.curry((model, id, params) => {
    return Promise.resolve(model.findOneAndUpdate({ _id: id }, params))
      .then(R.always)
      .catch(R.always)
      .then(R.call);
  }),
};

export default Repo;
