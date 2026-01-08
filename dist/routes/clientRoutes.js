"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientController_1 = require("../controllers/clientController");
const router = (0, express_1.Router)();
router.post('/', clientController_1.clientController.create);
router.get('/', clientController_1.clientController.getAll);
router.get('/:id', clientController_1.clientController.getOne);
exports.default = router;
