import { Router } from 'express';
import BotController from '@/controllers/bot';

const router = Router();

router.post('/', BotController.store);
router.get('/', BotController.index);

export default (app) => app.use('/app/bot', router);
