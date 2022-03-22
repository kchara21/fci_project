"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolController = void 0;
const class_validator_1 = require("class-validator");
const Piscina_1 = require("../entity/Piscina");
const typeorm_1 = require("typeorm");
const Parametro_1 = require("../entity/Parametro");
class PoolController {
}
exports.PoolController = PoolController;
_a = PoolController;
PoolController.getAll = async (req, res) => {
    const poolRepository = (0, typeorm_1.getRepository)(Piscina_1.Piscina);
    const paramRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    let piscinas;
    try {
        const piscinasMapped = [];
        const parametrosMapped = [];
        piscinas = await poolRepository.find({ relations: ["parametros", "usuarios"] });
        for (const piscina of piscinas) {
            for (let parametro of piscina.parametros) {
                parametro = await paramRepository.findOne(parametro.id, { relations: ["plantilla"] });
                parametrosMapped.push(parametro);
            }
            const piscinaMapped = Object.assign(Object.assign({}, piscina), { parametros: parametrosMapped });
            piscinasMapped.push(piscinaMapped);
        }
        if (piscinasMapped.length > 0) {
            return res.json(piscinasMapped);
        }
        res.status(404).json({ message: 'Not result' });
    }
    catch (e) {
        res.status(404).json({ message: 'Something goes wrong!' });
    }
};
PoolController.getById = async (req, res) => {
    const poolRepository = (0, typeorm_1.getRepository)(Piscina_1.Piscina);
    const paramRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    let piscina;
    const { id } = req.params;
    try {
        const parametrosMapped = [];
        piscina = await poolRepository.findOneOrFail(id, { relations: ["parametros", "usuarios"] });
        for (let parametro of piscina.parametros) {
            parametro = await paramRepository.findOne(parametro.id, { relations: ["plantilla"] });
            parametrosMapped.push(parametro);
        }
        const piscinaMapped = Object.assign(Object.assign({}, piscina), { parametros: parametrosMapped });
        if (piscinaMapped) {
            return res.json(piscinaMapped);
        }
        res.status(404).json({ message: 'Not result' });
    }
    catch (e) {
        res.status(404).json({ message: 'Something goes wrong!' });
    }
};
PoolController.newPool = async (req, res) => {
    const { codigo, camaronera, responsable } = req.body;
    const pool = new Piscina_1.Piscina;
    pool.codigo = codigo;
    pool.camaronera = camaronera;
    pool.responsable = responsable;
    const validationOpts = { validationError: { target: false, value: false } };
    const errors = await (0, class_validator_1.validate)(pool, validationOpts);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    const poolRepository = (0, typeorm_1.getRepository)(Piscina_1.Piscina);
    try {
        await poolRepository.save(pool);
    }
    catch (e) {
        return res.status(404).json({ message: 'Pool already exist' });
    }
    res.json('Piscina Creada!');
};
PoolController.editPool = async (req, res) => {
    let pool;
    const { id } = req.params;
    const { codigo, componente, camaronera, responsable } = req.body;
    const poolRepository = (0, typeorm_1.getRepository)(Piscina_1.Piscina);
    try {
        pool = await poolRepository.findOneOrFail(id);
        pool.codigo = codigo;
        pool.componente = componente;
        pool.camaronera = camaronera;
        pool.responsable = responsable;
    }
    catch (e) {
        return res.status(404).json({ message: 'Parameter not found' });
    }
    const validationOpts = { validationError: { target: false, value: false } };
    const errors = await (0, class_validator_1.validate)(pool, validationOpts);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    try {
        await poolRepository.save(pool);
    }
    catch (e) {
        return res.status(409).json({ message: '¡Piscina existente!' });
    }
    res.status(201).json({ message: 'Piscina Actualizada' });
};
PoolController.deletePool = async (req, res) => {
    const { id } = req.params;
    const poolRepository = (0, typeorm_1.getRepository)(Piscina_1.Piscina);
    let pool;
    try {
        pool = await poolRepository.findOneOrFail(id);
    }
    catch (e) {
        res.status(404).json({ message: 'Pool not found' });
    }
    poolRepository.delete(id);
    res.status(201).json({ message: '¡Piscina Eliminada!' });
};
//# sourceMappingURL=poolController.js.map