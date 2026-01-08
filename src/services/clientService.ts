import { db } from '../config/db';
// import { sheetService } from './sheetService';

export class ClientService {
  async createClient(data: { name: string; phone: string; email?: string; notes?: string }) {
    // Check for duplicate phone
    const existing = await db.query('SELECT id FROM clients WHERE phone = $1', [data.phone]);
    if (existing.rows.length > 0) {
      throw new Error('Client with this phone number already exists (duplicate)');
    }

    const result = await db.query(
      `INSERT INTO clients (name, phone, email, notes)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [data.name, data.phone, data.email || null, data.notes || null]
    );

    const client = result.rows[0];

    // Sync to Google Sheets
    // await sheetService.addClient(client);

    return client;
  }

  async updateClient(id: string, data: { name?: string; phone?: string; email?: string; notes?: string }) {
    // If updating phone, check for duplicates (excluding self)
    if (data.phone) {
      const existing = await db.query('SELECT id FROM clients WHERE phone = $1 AND id != $2', [data.phone, id]);
      if (existing.rows.length > 0) {
        throw new Error('Another client with this phone number already exists (duplicate)');
      }
    }

    const fields = [];
    const values = [];
    let idx = 1;

    if (data.name) {
      fields.push(`name = $${idx++}`);
      values.push(data.name);
    }
    if (data.phone) {
      fields.push(`phone = $${idx++}`);
      values.push(data.phone);
    }
    if (data.email !== undefined) {
      fields.push(`email = $${idx++}`); // Allow setting to null/empty if handled by frontend
      values.push(data.email);
    }
    if (data.notes !== undefined) {
      fields.push(`notes = $${idx++}`);
      values.push(data.notes);
    }

    if (fields.length === 0) return null;

    values.push(id);
    const result = await db.query(
      `UPDATE clients SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`,
      values
    );

    return result.rows[0];
  }

  async getClients() {
    const result = await db.query('SELECT * FROM clients ORDER BY created_at DESC');
    return result.rows;
  }

  async getClientById(id: string) {
    const clientResult = await db.query('SELECT * FROM clients WHERE id = $1', [id]);
    const client = clientResult.rows[0];

    if (!client) return null;

    const transactionsResult = await db.query('SELECT * FROM transactions WHERE client_id = $1 ORDER BY date DESC', [id]);
    client.transactions = transactionsResult.rows;

    return client;
  }

  async deleteClient(id: string) {
    // First delete associated transactions (manual cascade)
    await db.query('DELETE FROM transactions WHERE client_id = $1', [id]);
    
    // Then delete the client
    const result = await db.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);
    
    return result.rows[0];
  }
}

export const clientService = new ClientService();
