import '@/config/database';
import Express from 'express';
import * as R from 'ramda';
import middlewares from '@/core/middlewares';
import routes from '@/core/routes';

const App = Express();

const inject_dependencies = R.map(
  R.ifElse(R.propEq('use', true), R.pipe(R.prop('implement'), R.call), R.always)
);

R.pipe(R.flatten, inject_dependencies)([middlewares(App), routes(App)]);
// inject_dependencies(R.flatten([middlewares(App), routes(App)]));

export default App;
