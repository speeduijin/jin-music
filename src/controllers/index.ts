import { RequestHandler } from 'express';

const renderIndex: RequestHandler = (req, res) => {
  res.send('Hello World!');
};

export default renderIndex;
