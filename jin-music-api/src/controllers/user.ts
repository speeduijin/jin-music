import { RequestHandler } from 'express';
import {
  getLikedSong as getLikedSongService,
  getLikedSongId as getLikedSongIdService,
  postLikedSong as postLikedSongService,
  delLikedSong as delLikedSongService,
} from '../services/user';

const resMap = {
  InvalidReqSongId: {
    status: 400,
    message: '올바른 음원 아이디가 아닙니다.',
  },
  noUser: { status: 401, message: '가입되지 않은 회원입니다.' },
  alreadyLiked: { status: 400, message: '이미 좋아요한 음원입니다.' },
  notLiked: { status: 400, message: '좋아요한 음원이 아닙니다.' },
  success: { status: 201, message: 'success.' },
  delCompleted: { status: 200, message: 'delete completed.' },
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

const getLikedSongId: RequestHandler = async (req, res, next) => {
  const userId = req.user?.id;
  try {
    if (userId) {
      const result = await getLikedSongIdService(userId);

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

const delLikedSong: RequestHandler = async (req, res, next) => {
  const userId = req.user?.id;

  const songId = parseInt(req.params.songId, 10);

  try {
    if (userId) {
      const result = await delLikedSongService(userId, songId);

      const { status, message } = resMap[result];

      return res.status(status).json(message);
    }

    return res.status(401).json({ message: '사용자가 로그인하지 않았습니다.' });
  } catch (error) {
    return next(error);
  }
};

const getInfo: RequestHandler = (req, res) => {
  const { user } = req;
  return res.json(user);
};

export { getLikedSong, getLikedSongId, postLikedSong, delLikedSong, getInfo };
