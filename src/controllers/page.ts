import { RequestHandler } from 'express';

const renderMain: RequestHandler = (req, res) => {
  res.send('Main Page');
};

const renderLogin: RequestHandler = (req, res) => {
  res.send('Login Page');
};

const renderJoin: RequestHandler = (req, res) => {
  res.send('Join Page');
};

const renderProfile: RequestHandler = (req, res) => {
  res.send('Profile Page');
};

export { renderMain, renderLogin, renderJoin, renderProfile };
