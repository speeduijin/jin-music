import express from 'express';
import chart from '../controllers/song';

const router = express.Router();

router.get('/chart', chart);

export default router;
