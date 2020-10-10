import { Router } from 'express';
import IbmWatsonController from '@/controllers/ibm_watson';

const router = Router();

router.post('/send_message', IbmWatsonController.send_message);

export default (app) => app.use('/app/watson', router);
