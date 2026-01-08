"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const transactionRoutes_1 = __importDefault(require("./routes/transactionRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Public routes (no authentication required)
app.use('/api/auth', authRoutes_1.default);
// Protected routes (authentication required)
app.use('/api/clients', authMiddleware_1.authMiddleware, clientRoutes_1.default);
app.use('/api/transactions', authMiddleware_1.authMiddleware, transactionRoutes_1.default);
// Basic health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
exports.default = app;
