import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || 'SoulAesthetics',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
  },
  googleSheets: {
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
};
