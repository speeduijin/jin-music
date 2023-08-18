import { Router } from 'express';
import renderIndex from '../controllers/index';

const router = Router();

router.get('/', renderIndex);

export default router;
