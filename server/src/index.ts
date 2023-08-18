import 'dotenv/config';
import logger from './logger';
import './db';
import app from './app';

const PORT = process.env.PORT || 3000;
const handleListening = () =>
  logger.info(`✅ Server listenting on http://localhost:${PORT}.`);

app.listen(PORT, handleListening);
