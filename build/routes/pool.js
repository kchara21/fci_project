"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var poolController_1 = require("../controller/poolController");
var router = express_1.Router();
//Get all paramethers
router.get('/', poolController_1.PoolController.getAll);
//Get one paramether
router.get('/:id', poolController_1.PoolController.getById);
//Create paramether
router.post('/', poolController_1.PoolController.newPool);
//Edit paramether
router.patch('/:id', poolController_1.PoolController.editPool);
//Delete paramether
router.delete('/:id', poolController_1.PoolController.deletePool);
exports.default = router;
//# sourceMappingURL=pool.js.map