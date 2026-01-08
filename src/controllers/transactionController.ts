import { Request, Response } from 'express';
import { transactionService } from '../services/transactionService';

export class TransactionController {
  async create(req: Request, res: Response) {
    try {
      const transaction = await transactionService.createTransaction(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create transaction' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const transactions = await transactionService.getTransactions();
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  }
}

export const transactionController = new TransactionController();
