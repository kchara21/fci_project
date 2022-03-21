"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var parameterController_1 = require("../controller/parameterController");
var router = express_1.Router();
//Get all parameter
router.get('/', parameterController_1.ParameterController.getAll);
// Compare parameter
router.get('/compare', parameterController_1.ParameterController.saveParameter);
// //Create paramether
// router.post('/',User_PoolController.newUser_Pool);
// //Edit paramether
// router.patch('/:id',User_PoolController.editUser_Pool);
// //Delete paramether
// router.delete('/:id',User_PoolController.deleteUser_Pool);
exports.default = router;
//# sourceMappingURL=parameter.js.map