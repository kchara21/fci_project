"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_poolController_1 = require("../controller/user_poolController");
var router = express_1.Router();
//Get all paramethers
router.get('/', user_poolController_1.User_PoolController.getAll);
//Get one paramether
router.get('/:id', user_poolController_1.User_PoolController.getById);
//Create paramether
router.post('/', user_poolController_1.User_PoolController.newUser_Pool);
//Edit paramether
router.patch('/:id', user_poolController_1.User_PoolController.editUser_Pool);
//Delete paramether
router.delete('/:id', user_poolController_1.User_PoolController.deleteUser_Pool);
exports.default = router;
//# sourceMappingURL=user_pool.js.map