import { Router } from 'express';
import ParticipationController from '@/controllers/participation';

const router = Router();

router.post('/', ParticipationController.store);
router.get('/', ParticipationController.index);
// router.get('/:id', ParticipationController.show);
router.put('/:id', ParticipationController.update);
// router.delete('/:id', ParticipationController.destroy);

export default (app) => app.use('/app/participations', router);
