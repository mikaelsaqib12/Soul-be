import { Pool } from 'pg';
import { config } from './env';
import dotenv from 'dotenv';

dotenv.config();

// Check karein ke hum Cloud par hain ya Local par
const isProduction = process.env.NODE_ENV === 'production' || process.env.DATABASE_URL;

const pool = new Pool(
  isProduction
    ? {
        // Agar Render par hain to ye use karein:
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false, // Neon ke liye ye Zaroori hai
        },
      }
    : {
        // Agar apne laptop par hain to ye use karein:
        host: config.db.host,
        port: config.db.port,
        database: config.db.database,
        user: config.db.user,
        password: config.db.password,
      }
);

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export const db = {
  query: (text: string, params?: any[]) => pool.query(text, params),
};