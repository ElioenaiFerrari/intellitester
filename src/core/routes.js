import auth_router from '@/router/auth';
import ibm_watson_router from '@/router/ibm_watson';
import bot_router from '@/router/bot';
import test_router from '@/router/test';

const routes = (app) => [
  {
    use: true,
    name: 'routes/auth',
    implement: () => auth_router(app),
  },
  {
    use: true,
    name: 'routes/ibm_watson',
    implement: () => ibm_watson_router(app),
  },
  {
    use: true,
    name: 'routes/bot',
    implement: () => bot_router(app),
  },
  {
    use: true,
    name: 'routes/test',
    implement: () => test_router(app),
  },
];

export default routes;
