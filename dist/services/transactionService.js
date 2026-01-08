"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionService = exports.TransactionService = void 0;
const db_1 = require("../config/db");
const sheetService_1 = require("./sheetService");
class TransactionService {
    createTransaction(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.db.query(`INSERT INTO transactions (type, amount, category, description, date, client_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`, [
                data.type,
                data.amount,
                data.category,
                data.description || null,
                new Date(data.date).toISOString(),
                data.clientId || null,
            ]);
            const transaction = result.rows[0];
            // Sync to Google Sheets
            yield sheetService_1.sheetService.addTransaction(Object.assign(Object.assign({}, transaction), { amount: parseFloat(transaction.amount) // Ensure it's a number for sheets
             }));
            return transaction;
        });
    }
    getTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.db.query(`
      SELECT t.*, row_to_json(c) as client 
      FROM transactions t
      LEFT JOIN clients c ON t.client_id = c.id
      ORDER BY t.date DESC
    `);
            return result.rows;
        });
    }
}
exports.TransactionService = TransactionService;
exports.transactionService = new TransactionService();
