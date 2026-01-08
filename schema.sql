-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(20) DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Client Table
CREATE TABLE IF NOT EXISTS clients (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255),
  notes TEXT,
  skin_type TEXT,
  allergies TEXT,
  medications TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transaction Table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(20) CHECK (type IN ('REVENUE', 'EXPENSE')),
  amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  date TIMESTAMP NOT NULL,
  client_id uuid REFERENCES clients(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
