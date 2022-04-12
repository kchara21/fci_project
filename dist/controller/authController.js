"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const class_validator_1 = require("class-validator");
class AuthController {
}
_a = AuthController;
AuthController.login = async (req, res) => {
    const { email, clave } = req.body;
    if (!(email && clave)) {
        res.status(400).json({ message: 'Usuario y clave son requeridos!' });
    }
    const userRepository = (0, typeorm_1.getRepository)(User_1.Usuario);
    let user;
    try {
        user = await userRepository.findOneOrFail({ where: { email } });
    }
    catch (e) {
        return res.status(400).json({ message: 'Usuario o clave incorrectos!' });
    }
    if (!user.checkPassword(clave)) {
        return res.status(400).json({ message: 'Usuario o clave incorrecta' });
    }
    const token = jwt.sign({ userId: user.id, email: user.email }, config_1.default.jwtSecret, { expiresIn: '2h' });
    res.json({ message: 'OK', token, userId: user.id, email: user.email, rol: user.rol });
};
AuthController.changePassword = async (req, res) => {
    const { userId } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
        return res.status(400).json({ message: 'Old Password & New Password are required' });
    }
    const userRepository = (0, typeorm_1.getRepository)(User_1.Usuario);
    let user;
    try {
        user = await userRepository.findOneOrFail(userId);
    }
    catch (e) {
        res.status(400).json({ message: 'Somenthing goes wrong!' });
    }
    if (!user.checkPassword(oldPassword)) {
        return res.status(401).json({ message: 'Check your old password...' });
    }
    user.clave = newPassword;
    const validationOps = { validationError: { target: false, value: false } };
    const errors = await (0, class_validator_1.validate)(user, validationOps);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    user.hashPassword();
    userRepository.save(user);
    res.json({ message: 'Password change' });
};
exports.default = AuthController;
//# sourceMappingURL=authController.js.map