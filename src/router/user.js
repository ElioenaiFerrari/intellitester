import { Router } from 'express';
import UserController from '@/controllers/user';

const router = Router();

// router.post('/', UserController.store);
router.get('/', UserController.index);
// router.get('/:id', UserController.show);
// router.put('/:id', UserController.update);
// router.delete('/:id', UserController.destroy);

export default (app) => app.use('/app/users', router);
