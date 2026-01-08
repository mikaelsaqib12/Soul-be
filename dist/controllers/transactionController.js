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
exports.transactionController = exports.TransactionController = void 0;
const transactionService_1 = require("../services/transactionService");
class TransactionController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = yield transactionService_1.transactionService.createTransaction(req.body);
                res.status(201).json(transaction);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Failed to create transaction' });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield transactionService_1.transactionService.getTransactions();
                res.json(transactions);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch transactions' });
            }
        });
    }
}
exports.TransactionController = TransactionController;
exports.transactionController = new TransactionController();
