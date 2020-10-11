import auth_router from '@/router/auth';
import bot_router from '@/router/bot';
import test_router from '@/router/test';
import user_router from '@/router/user';

const routes = (app) => [
  {
    use: true,
    name: 'routes/auth',
    implement: () => auth_router(app),
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
  {
    use: true,
    name: 'routes/user',
    implement: () => user_router(app),
  },
];

export default routes;
