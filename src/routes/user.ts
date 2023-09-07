import express from 'express';
import { getLikedSong, postLikedSong } from '../controllers/user';
import { isLoggedIn } from '../utils/authMiddleware';

const router = express.Router();

router.get('/likedsong', isLoggedIn, getLikedSong);

router.post('/likedsong/:songId', isLoggedIn, postLikedSong);

export default router;
