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
exports.clientController = exports.ClientController = void 0;
const clientService_1 = require("../services/clientService");
class ClientController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield clientService_1.clientService.createClient(req.body);
                res.status(201).json(client);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Failed to create client' });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield clientService_1.clientService.getClients();
                res.json(clients);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch clients' });
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield clientService_1.clientService.getClientById(req.params.id);
                if (!client) {
                    res.status(404).json({ error: 'Client not found' });
                    return;
                }
                res.json(client);
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to fetch client' });
            }
        });
    }
}
exports.ClientController = ClientController;
exports.clientController = new ClientController();
