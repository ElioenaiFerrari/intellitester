import morgan from 'morgan';
import cors from 'cors';
import express from 'express';
import AuthMiddleware from '@/middlewares/auth';

const middlewares = (app) => [
  {
    use: true,
    name: 'middlewares/cors',
    implement: () => app.use(cors({ origin: true })),
  },
  {
    use: true,
    name: 'middlewares/json',
    implement: () => app.use(express.json()),
  },
  {
    use: true,
    name: 'middlewares/morgan',
    implement: () => app.use(morgan('dev')),
  },

  {
    use: true,
    name: 'middlewares/auth',
    implement: () => app.use(['/app'], AuthMiddleware.check),
  },
];

export default middlewares;
