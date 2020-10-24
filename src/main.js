import * as R from 'ramda';
import App from '@/config/app';
import Env from '@/config/env';

const feedback = () => `Server on http://localhost:${Env.get('PORT')}`;

console.log(Env.get('APP_SECRET'));

App.listen(Env.get('PORT'), R.pipe(feedback, console.log));
