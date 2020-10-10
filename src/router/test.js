import { Router } from 'express';
import TestController from '@/controllers/test';

const router = Router();

router.post('/:bot_id', TestController.store);
router.get('/:bot_id', TestController.index);
// router.get('/:id', TestController.show);
router.put('/:id', TestController.update);
// router.delete('/:id', TestController.destroy);

export default (app) => app.use('/app/tests', router);
