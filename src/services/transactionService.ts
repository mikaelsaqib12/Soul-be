import { db } from '../config/db';
// import { sheetService } from './sheetService';

export class TransactionService {
  async createTransaction(data: {
    type: 'REVENUE' | 'EXPENSE';
    amount: number;
    category: string;
    description?: string;
    date: string | Date;
    clientId?: string;
    client_id?: string;
  }) {
    const result = await db.query(
      `INSERT INTO transactions (type, amount, category, description, date, client_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        data.type,
        data.amount,
        data.category,
        data.description || null,
        new Date(data.date).toISOString(),
        data.clientId || data.client_id || null, // Support both formats
      ]
    );

    const transaction = result.rows[0];

    // Sync to Google Sheets
    // await sheetService.addTransaction({
    //     ...transaction,
    //     amount: parseFloat(transaction.amount) // Ensure it's a number for sheets
    // });

    return transaction;
  }

  async getTransactions() {
    const result = await db.query(`
      SELECT t.*, row_to_json(c) as client 
      FROM transactions t
      LEFT JOIN clients c ON t.client_id = c.id
      ORDER BY t.date DESC, t.created_at DESC
    `);
    
    return result.rows;
  }
}

export const transactionService = new TransactionService();
