import { Router } from 'express';
import { transactionController } from '../controllers/transactionController';

const router = Router();

router.post('/', transactionController.create);
router.get('/', transactionController.getAll);

export default router;
