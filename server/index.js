import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { pool, verifyDatabaseConnection } from './config/db.js';
import donationsRouter from './routes/donations.js';
import helpRequestsRouter from './routes/helpRequests.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 5000);
const allowedOrigin = process.env.CORS_ORIGIN || '*';

app.use(cors({ origin: allowedOrigin === '*' ? true : allowedOrigin }));
app.use(express.json());

app.get('/api/health', async (_req, res, next) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      ok: true,
      service: 'helpbeat-server',
      database: 'connected'
    });
  } catch (error) {
    next(error);
  }
});

app.use('/api/donations', donationsRouter);
app.use('/api/help-requests', helpRequestsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

verifyDatabaseConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  });
