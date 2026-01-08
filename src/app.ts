import express from 'express';
import cors from 'cors';

import clientRoutes from './routes/clientRoutes';
import transactionRoutes from './routes/transactionRoutes';
import authRoutes from './routes/authRoutes';
import { authMiddleware } from './middleware/authMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

// Public routes (no authentication required)
app.use('/api/auth', authRoutes);

// Protected routes (authentication required)
app.use('/api/clients', authMiddleware, clientRoutes);
app.use('/api/transactions', authMiddleware, transactionRoutes);

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;
