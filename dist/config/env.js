"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT || 5000,
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
        privateKey: (_a = process.env.GOOGLE_PRIVATE_KEY) === null || _a === void 0 ? void 0 : _a.replace(/\\n/g, '\n'),
    },
};
