import '@/config/database';
import express from 'express';
import * as R from 'ramda';
import middlewares from '@/core/middlewares';
import routes from '@/core/routes';

const App = express();

const inject_dependencies = R.map(
  R.ifElse(R.propEq('use', true), R.pipe(R.prop('implement'), R.call), R.always)
);

inject_dependencies(R.flatten([middlewares(App), routes(App)]));

export default App;
