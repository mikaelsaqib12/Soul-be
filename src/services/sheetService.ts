import { google } from 'googleapis';
import { config } from '../config/env';

export class SheetService {
  private auth;
  private sheets;
  private spreadsheetId;

  constructor() {
    this.spreadsheetId = config.googleSheets.spreadsheetId;

    if (config.googleSheets.clientEmail && config.googleSheets.privateKey) {
      this.auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: config.googleSheets.clientEmail,
          private_key: config.googleSheets.privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      this.sheets = google.sheets({ version: 'v4', auth: this.auth });
    } else {
      console.warn('Google Sheets credentials not provided. Sheets integration disabled.');
    }
  }

  async appendRow(range: string, values: string[]) {
    if (!this.sheets || !this.spreadsheetId) {
        console.log('Skipping Google Sheets append (Not Configured):', values);
        return;
    }

    try {
      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [values],
        },
      });
    } catch (error) {
      console.error('Error appending to Google Sheets:', error);
    }
  }

  async addClient(client: { name: string; phone: string; email?: string | null; notes?: string | null }) {
      // Assuming 'Clients' is the sheet name
      await this.appendRow('Clients!A:D', [
          client.name,
          client.phone,
          client.email || '',
          client.notes || '',
          new Date().toISOString()
      ]);
  }

  async addTransaction(transaction: { type: string; amount: number; category: string; description?: string | null; date: Date }) {
      // Assuming 'Transactions' is the sheet name
      await this.appendRow('Transactions!A:E', [
          transaction.type,
          transaction.amount.toString(),
          transaction.category,
          transaction.description || '',
          transaction.date.toISOString(),
      ]);
  }
}

export const sheetService = new SheetService();
