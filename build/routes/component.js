"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var componentController_1 = require("../controller/componentController");
var router = express_1.Router();
//Get all paramethers
router.get('/', componentController_1.ComponentController.getAll);
//Get one paramether
router.get('/:id', componentController_1.ComponentController.getById);
//Create paramether
router.post('/', componentController_1.ComponentController.newComponent);
//Edit paramether
router.patch('/:id', componentController_1.ComponentController.editComponent);
//Delete paramether
router.delete('/:id', componentController_1.ComponentController.deleteComponent);
exports.default = router;
//# sourceMappingURL=component.js.map