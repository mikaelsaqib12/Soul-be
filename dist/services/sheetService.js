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
exports.sheetService = exports.SheetService = void 0;
const googleapis_1 = require("googleapis");
const env_1 = require("../config/env");
class SheetService {
    constructor() {
        this.spreadsheetId = env_1.config.googleSheets.spreadsheetId;
        if (env_1.config.googleSheets.clientEmail && env_1.config.googleSheets.privateKey) {
            this.auth = new googleapis_1.google.auth.GoogleAuth({
                credentials: {
                    client_email: env_1.config.googleSheets.clientEmail,
                    private_key: env_1.config.googleSheets.privateKey,
                },
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
            this.sheets = googleapis_1.google.sheets({ version: 'v4', auth: this.auth });
        }
        else {
            console.warn('Google Sheets credentials not provided. Sheets integration disabled.');
        }
    }
    appendRow(range, values) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.sheets || !this.spreadsheetId) {
                console.log('Skipping Google Sheets append (Not Configured):', values);
                return;
            }
            try {
                yield this.sheets.spreadsheets.values.append({
                    spreadsheetId: this.spreadsheetId,
                    range,
                    valueInputOption: 'USER_ENTERED',
                    requestBody: {
                        values: [values],
                    },
                });
            }
            catch (error) {
                console.error('Error appending to Google Sheets:', error);
            }
        });
    }
    addClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            // Assuming 'Clients' is the sheet name
            yield this.appendRow('Clients!A:D', [
                client.name,
                client.phone,
                client.email || '',
                client.notes || '',
                new Date().toISOString()
            ]);
        });
    }
    addTransaction(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            // Assuming 'Transactions' is the sheet name
            yield this.appendRow('Transactions!A:E', [
                transaction.type,
                transaction.amount.toString(),
                transaction.category,
                transaction.description || '',
                transaction.date.toISOString(),
            ]);
        });
    }
}
exports.SheetService = SheetService;
exports.sheetService = new SheetService();
