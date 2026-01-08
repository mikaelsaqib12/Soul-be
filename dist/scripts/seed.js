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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../config/db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SUPER_ADMIN_EMAIL = 'mikaelsaqi@gmail.com';
const SUPER_ADMIN_PASSWORD = 'Mikael2000';
const SUPER_ADMIN_NAME = 'Mikael Saqi';
function seedSuperAdmin() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('🌱 Seeding super admin user...');
            // Check if admin already exists
            const existingAdmin = yield db_1.db.query('SELECT * FROM users WHERE email = $1', [SUPER_ADMIN_EMAIL]);
            if (existingAdmin.rows.length > 0) {
                console.log('✅ Super admin already exists!');
                console.log(`Email: ${SUPER_ADMIN_EMAIL}`);
                process.exit(0);
            }
            // Hash password
            const hashedPassword = yield bcryptjs_1.default.hash(SUPER_ADMIN_PASSWORD, 10);
            // Create super admin
            const result = yield db_1.db.query('INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role, created_at', [SUPER_ADMIN_EMAIL, hashedPassword, SUPER_ADMIN_NAME, 'ADMIN']);
            const admin = result.rows[0];
            console.log('✅ Super admin created successfully!');
            console.log('═══════════════════════════════════════');
            console.log('Email:', admin.email);
            console.log('Password:', SUPER_ADMIN_PASSWORD);
            console.log('Role:', admin.role);
            console.log('Created:', admin.created_at);
            console.log('═══════════════════════════════════════');
            process.exit(0);
        }
        catch (error) {
            console.error('❌ Error seeding super admin:', error);
            process.exit(1);
        }
    });
}
seedSuperAdmin();
