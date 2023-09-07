import { RequestHandler } from 'express';
import {
  getLikedSong as getLikedSongService,
  postLikedSong as postLikedSongService,
} from '../services/user';

const resMap = {
  InvalidReqSongId: {
    status: 400,
    message: '올바른 음원 아이디가 아닙니다.',
  },
  noUser: { status: 401, message: '가입되지 않은 회원입니다.' },
  alreadyLiked: { status: 400, message: '이미 좋아요한 음원입니다.' },
  success: {
    status: 201,
    message: 'success',
  },
};

const getLikedSong: RequestHandler = async (req, res, next) => {
  const userId = req.user?.id;
  try {
    if (userId) {
      const result = await getLikedSongService(userId);

      return res.json(result);
    }

    return res.status(401).json({ message: '사용자가 로그인하지 않았습니다.' });
  } catch (error) {
    return next(error);
  }
};

const postLikedSong: RequestHandler = async (req, res, next) => {
  const userId = req.user?.id;

  const songId = parseInt(req.params.songId, 10);

  try {
    if (userId) {
      const result = await postLikedSongService(userId, songId);

      const { status, message } = resMap[result];

      return res.status(status).json(message);
    }

    return res.status(401).json({ message: '사용자가 로그인하지 않았습니다.' });
  } catch (error) {
    return next(error);
  }
};

export { getLikedSong, postLikedSong };
