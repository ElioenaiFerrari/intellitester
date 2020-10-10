import auth_router from '@/router/auth';
import ibm_watson_router from '@/router/ibm_watson';

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
];

export default routes;
