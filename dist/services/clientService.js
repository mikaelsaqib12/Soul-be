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
exports.clientService = exports.ClientService = void 0;
const db_1 = require("../config/db");
const sheetService_1 = require("./sheetService");
class ClientService {
    createClient(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.db.query(`INSERT INTO clients (name, phone, email, notes)
       VALUES ($1, $2, $3, $4)
       RETURNING *`, [data.name, data.phone, data.email || null, data.notes || null]);
            const client = result.rows[0];
            // Sync to Google Sheets
            yield sheetService_1.sheetService.addClient(client);
            return client;
        });
    }
    getClients() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.db.query('SELECT * FROM clients ORDER BY created_at DESC');
            return result.rows;
        });
    }
    getClientById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientResult = yield db_1.db.query('SELECT * FROM clients WHERE id = $1', [id]);
            const client = clientResult.rows[0];
            if (!client)
                return null;
            const transactionsResult = yield db_1.db.query('SELECT * FROM transactions WHERE client_id = $1', [id]);
            client.transactions = transactionsResult.rows;
            return client;
        });
    }
}
exports.ClientService = ClientService;
exports.clientService = new ClientService();
