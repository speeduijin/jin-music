import express from 'express';
import { chart, playCount } from '../controllers/song';

const router = express.Router();

router.get('/chart', chart);

router.patch('/:songId/playcount', playCount);

export default router;
