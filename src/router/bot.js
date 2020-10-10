import { Router } from 'express';
import BotController from '@/controllers/bot';

const router = Router();

router.post('/', BotController.store);
router.get('/', BotController.index);
router.get('/:id', BotController.show);
router.put('/:id', BotController.update);
router.delete('/:id', BotController.destroy);

export default (app) => app.use('/app/bots', router);
