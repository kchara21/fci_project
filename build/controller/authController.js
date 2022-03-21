"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var jwt = require("jsonwebtoken");
var config_1 = require("../config/config");
var class_validator_1 = require("class-validator");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.login = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, email, clave, userRepository, user, e_1, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, clave = _a.clave;
                    if (!(email && clave)) {
                        res.status(400).json({ message: 'Username and Password are required!' });
                    }
                    userRepository = typeorm_1.getRepository(User_1.Usuario);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail({ where: { email: email } })];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    return [2 /*return*/, res.status(400).json({ message: 'Username or password incorrect!' })];
                case 4:
                    //Check password
                    if (!user.checkPassword(clave)) {
                        return [2 /*return*/, res.status(400).json({ message: 'Username or Password are incorrect!' })];
                    }
                    token = jwt.sign({ userId: user.id, email: user.email }, config_1.default.jwtSecret, { expiresIn: '1h' });
                    res.json({ message: 'OK', token: token, userId: user.id, rol: user.rol });
                    return [2 /*return*/];
            }
        });
    }); };
    AuthController.changePassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var userId, _a, oldPassword, newPassword, userRepository, user, e_2, validationOps, errors;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = res.locals.jwtPayload.userId;
                    _a = req.body, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
                    if (!(oldPassword && newPassword)) {
                        return [2 /*return*/, res.status(400).json({ message: 'Old Password & New Password are required' })];
                    }
                    userRepository = typeorm_1.getRepository(User_1.Usuario);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, userRepository.findOneOrFail(userId)];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _b.sent();
                    res.status(400).json({ message: 'Somenthing goes wrong!' });
                    return [3 /*break*/, 4];
                case 4:
                    if (!user.checkPassword(oldPassword)) {
                        return [2 /*return*/, res.status(401).json({ message: 'Check your old password...' })];
                    }
                    user.clave = newPassword;
                    validationOps = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(user, validationOps)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    //Hash password
                    user.hashPassword();
                    userRepository.save(user);
                    res.json({ message: 'Password change' });
                    return [2 /*return*/];
            }
        });
    }); };
    return AuthController;
}());
exports.default = AuthController;
//# sourceMappingURL=authController.js.map