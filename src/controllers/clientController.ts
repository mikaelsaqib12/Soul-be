import { Request, Response } from 'express';
import { clientService } from '../services/clientService';

export class ClientController {
  async create(req: Request, res: Response) {
    try {
      const client = await clientService.createClient(req.body);
      res.status(201).json(client);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create client' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const client = await clientService.updateClient(req.params.id, req.body);
      if (!client) {
         res.status(404).json({ error: 'Client not found or no changes made' });
         return;
      }
      res.json(client);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update client' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const clients = await clientService.getClients();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch clients' });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const client = await clientService.getClientById(req.params.id);
      if (!client) {
         res.status(404).json({ error: 'Client not found' });
         return;
      }
      res.json(client);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch client' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const client = await clientService.deleteClient(req.params.id);
      if (!client) {
         res.status(404).json({ error: 'Client not found' });
         return;
      }
      res.json({ message: 'Client deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete client' });
    }
  }
}

export const clientController = new ClientController();
