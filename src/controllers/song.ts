import { RequestHandler } from 'express';
import songService from '../services/song';

const chart: RequestHandler = async (req, res, next) => {
  try {
    const result = await songService();

    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

export default chart;
