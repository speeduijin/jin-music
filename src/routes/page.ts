import express from 'express';
import {
  renderMain,
  renderLogin,
  renderJoin,
  renderProfile,
} from '../controllers/page';
import { isLoggedIn, isNotLoggedIn } from '../middlewares/auth';

const router = express.Router();

router.get('/', renderMain);

router.get('/login', isNotLoggedIn, renderLogin);

router.get('/join', isNotLoggedIn, renderJoin);

router.get('/profile', isLoggedIn, renderProfile);

export default router;
