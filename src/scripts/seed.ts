import bcrypt from 'bcryptjs';
import { db } from '../config/db';
import dotenv from 'dotenv';

dotenv.config();

const SUPER_ADMIN_EMAIL = 'mikaelsaqi@gmail.com';
const SUPER_ADMIN_PASSWORD = 'Mikael2000';
const SUPER_ADMIN_NAME = 'Mikael Saqi';

async function seedSuperAdmin() {
  try {
    console.log('🌱 Seeding super admin user...');

    // Check if admin already exists
    const existingAdmin = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [SUPER_ADMIN_EMAIL]
    );

    if (existingAdmin.rows.length > 0) {
      console.log('✅ Super admin already exists!');
      console.log(`Email: ${SUPER_ADMIN_EMAIL}`);
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(SUPER_ADMIN_PASSWORD, 10);

    // Create super admin
    const result = await db.query(
      'INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role, created_at',
      [SUPER_ADMIN_EMAIL, hashedPassword, SUPER_ADMIN_NAME, 'ADMIN']
    );

    const admin = result.rows[0];

    console.log('✅ Super admin created successfully!');
    console.log('═══════════════════════════════════════');
    console.log('Email:', admin.email);
    console.log('Password:', SUPER_ADMIN_PASSWORD);
    console.log('Role:', admin.role);
    console.log('Created:', admin.created_at);
    console.log('═══════════════════════════════════════');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding super admin:', error);
    process.exit(1);
  }
}

seedSuperAdmin();
