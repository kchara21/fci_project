"use strict";
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
UserController.getAll = async (req, res) => {
    const userRepository = (0, typeorm_1.getRepository)(User_1.Usuario);
    let users;
    try {
        users = await userRepository.find({ relations: ["piscinas"] });
    }
    catch (e) {
        res.status(404).json({ message: 'Something goes wrong!' });
    }
    (users.length > 0)
        ? res.json(users)
        : res.status(404).json({ message: 'Not result' });
};
UserController.getById = async (req, res) => {
    const { id } = req.params;
    const userRepository = (0, typeorm_1.getRepository)(User_1.Usuario);
    try {
        const user = await userRepository.findOneOrFail(id, { relations: ["piscinas"] });
        res.json(user);
    }
    catch (e) {
        res.status(404).json({ message: 'Not Result' });
    }
};
UserController.newUser = async (req, res) => {
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
        const piscinas = await poolRepository.find();
        piscinas.forEach(piscina => {
            piscinaSupervisor.push(piscina);
        });
        user.piscinas = piscinaSupervisor;
    }
    else {
        const piscinasBD = await poolRepository.findByIds(piscinas);
        user.piscinas = piscinasBD;
    }
    try {
        user.hashPassword();
        await userRepository.save(user);
    }
    catch (e) {
        return res.status(404).json({ message: 'Este email ya existe' });
    }
    return res.json({ message: '¡Usuario Creado!' });
};
UserController.editUser = async (req, res) => {
    let user;
    const { id } = req.params;
    const { email, nombre, rol, piscinas } = req.body;
    const userRepository = (0, typeorm_1.getRepository)(User_1.Usuario);
    const poolRepository = (0, typeorm_1.getRepository)(Piscina_1.Piscina);
    try {
        user = await userRepository.findOneOrFail(id);
        const piscinasBD = await poolRepository.findByIds(piscinas);
        user.email = email;
        user.nombre = nombre;
        user.rol = rol;
        user.piscinas = piscinasBD;
    }
    catch (e) {
        return res.status(404).json({ message: 'User not found' });
    }
    const validationOpts = { validationError: { target: false, value: false } };
    const errors = await (0, class_validator_1.validate)(user, validationOpts);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    try {
        await userRepository.save(user);
    }
    catch (e) {
        return res.status(409).json({ message: 'Este email ya existe' });
    }
    res.status(201).json({ message: 'Usuario Actualizado' });
};
UserController.deleteUser = async (req, res) => {
    const { id } = req.params;
    const userRepository = (0, typeorm_1.getRepository)(User_1.Usuario);
    let user;
    try {
        user = await userRepository.findOneOrFail(id);
    }
    catch (e) {
        res.status(404).json({ message: 'User not found' });
    }
    userRepository.delete(id);
    res.status(201).json({ message: '¡Usuario Eliminado!' });
};
exports.default = UserController;
//# sourceMappingURL=UserController.js.map