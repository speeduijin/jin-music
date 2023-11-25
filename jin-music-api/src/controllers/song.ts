import { RequestHandler } from 'express';
import {
  chart as chartService,
  playCount as playCountService,
} from '../services/song';

const chart: RequestHandler = async (req, res, next) => {
  try {
    const result = await chartService();

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

const playCount: RequestHandler = async (req, res, next) => {
  const songId = parseInt(req.params.songId, 10);

  const resMap = {
    noReqId: {
      status: 400,
      message: 'ID가 제공되지 않았습니다.',
    },
    success: {
      status: 200,
      message: 'success',
    },
  };
  try {
    const result = await playCountService(songId);

    const { status, message } = resMap[result];

    return res.status(status).json(message);
  } catch (error) {
    return next(error);
  }
};

export { chart, playCount };
