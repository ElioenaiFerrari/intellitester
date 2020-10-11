import { Router } from 'express';
import TestController from '@/controllers/test';

const router = Router();

router.post('/:bot_id', TestController.store);
router.get('/:bot_id', TestController.index);
router.put('/:bot_id', TestController.update);
router.delete('/:bot_id', TestController.destroy);

export default (app) => app.use('/app/tests', router);
