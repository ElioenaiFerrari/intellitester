import mongoose from 'mongoose';
import Env from './env';
import * as R from 'ramda';

const success = () => `Mongo online`;
const failed = () => `Mongo offline`;

const connection_status = R.pipe(
  R.prop('connection'),
  R.ifElse(R.propEq('readyState', 1), success, failed)
);

const connect = () => {
  return mongoose
    .connect(Env.get('DB_HOST'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(connection_status)
    .catch(connection_status)
    .then(console.log);
};

export default connect();
