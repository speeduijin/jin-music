import express from 'express';
import {
  getLikedSong,
  postLikedSong,
  delLikedSong,
  getInfo,
} from '../controllers/user';
import { isLoggedIn } from '../utils/authMiddleware';

const router = express.Router();

router.get('/likedsong', isLoggedIn, getLikedSong);

router.post('/likedsong/:songId', isLoggedIn, postLikedSong);

router.delete('/likedsong/:songId', isLoggedIn, delLikedSong);

router.get('/info', getInfo);

export default router;
