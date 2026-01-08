import { Router } from 'express';
import { clientController } from '../controllers/clientController';

const router = Router();

router.post('/', clientController.create);
router.get('/', clientController.getAll);
router.get('/:id', clientController.getOne);
router.put('/:id', clientController.update);
router.delete('/:id', clientController.delete);

export default router;
