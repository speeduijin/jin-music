import express from 'express';
import { renderHome, renderChart } from '../controllers/pageController';

const pageRouter = express.Router();

pageRouter.get('/', renderHome);
pageRouter.get('/chart', renderChart);

export default pageRouter;
