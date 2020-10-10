import 'dotenv/config';

const Env = {
  get: (env) => process.env[env],
  set: (env, value) => (process.env[env] = value),
};

export default Env;
