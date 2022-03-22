"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var templateController_1 = require("../controller/templateController");
var router = express_1.Router();
//Get all paramethers
router.get('/', templateController_1.TemplateController.getAll);
//Get one paramether
router.get('/:id', templateController_1.TemplateController.getById);
//Create paramether
router.post('/', templateController_1.TemplateController.newParam);
//Edit paramether
router.patch('/:id', templateController_1.TemplateController.editParam);
//Delete paramether
router.delete('/:id', templateController_1.TemplateController.deleteParam);
exports.default = router;
//# sourceMappingURL=template.js.map