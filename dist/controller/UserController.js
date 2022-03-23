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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const class_validator_1 = require("class-validator");
const Piscina_1 = require("../entity/Piscina");
class UserController {
}
exports.UserController = UserController;
_a = UserController;
UserController.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(User_1.Usuario);
    let users;
    try {
        users = yield userRepository.find({ relations: ["piscinas"] });
    }
    catch (e) {
        res.status(404).json({ message: 'Something goes wrong!' });
    }
    (users.length > 0)
        ? res.json(users)
        : res.status(404).json({ message: 'Not result' });
});
UserController.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userRepository = (0, typeorm_1.getRepository)(User_1.Usuario);
    try {
        const user = yield userRepository.findOneOrFail(id, { relations: ["piscinas"] });
        res.json(user);
    }
    catch (e) {
        res.status(404).json({ message: 'Not Result' });
    }
});
UserController.newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = (0, typeorm_1.getRepository)(User_1.Usuario);
    const poolRepository = (0, typeorm_1.getRepository)(Piscina_1.Piscina);
    const { email, nombre, clave, rol, piscinas } = req.body;
    const user = new User_1.Usuario();
    let piscinaSupervisor = [];
    user.email = email;
    user.nombre = nombre;
    user.clave = clave;
    user.rol = rol;
    if (user.rol === 'supervisor') {
        const piscinas = yield poolRepository.find();
        piscinas.forEach(piscina => {
            piscinaSupervisor.push(piscina);
        });
        user.piscinas = piscinaSupervisor;
    }
    else {
        const piscinasBD = yield poolRepository.findByIds(piscinas);
        user.piscinas = piscinasBD;
    }
    try {
        user.hashPassword();
        yield userRepository.save(user);
    }
    catch (e) {
        return res.status(404).json({ message: 'Este email ya existe' });
    }
    return res.json({ message: '¡Usuario Creado!' });
});
UserController.editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    const { id } = req.params;
    const { email, nombre, rol, piscinas } = req.body;
    const userRepository = (0, typeorm_1.getRepository)(User_1.Usuario);
    const poolRepository = (0, typeorm_1.getRepository)(Piscina_1.Piscina);
    //Try get User
    try {
        user = yield userRepository.findOneOrFail(id);
        const piscinasBD = yield poolRepository.findByIds(piscinas);
        user.email = email;
        user.nombre = nombre;
        user.rol = rol;
        user.piscinas = piscinasBD;
    }
    catch (e) {
        return res.status(404).json({ message: 'User not found' });
    }
    const validationOpts = { validationError: { target: false, value: false } };
    const errors = yield (0, class_validator_1.validate)(user, validationOpts);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    //Try to save user
    try {
        yield userRepository.save(user);
    }
    catch (e) {
        return res.status(409).json({ message: 'Este email ya existe' });
    }
    res.status(201).json({ message: 'Usuario Actualizado' });
});
UserController.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userRepository = (0, typeorm_1.getRepository)(User_1.Usuario);
    let user;
    try {
        user = yield userRepository.findOneOrFail(id);
    }
    catch (e) {
        res.status(404).json({ message: 'User not found' });
    }
    //Remove user
    userRepository.delete(id);
    res.status(201).json({ message: '¡Usuario Eliminado!' });
});
exports.default = UserController;
