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
exports.PoolController = void 0;
const class_validator_1 = require("class-validator");
const Piscina_1 = require("../entity/Piscina");
const typeorm_1 = require("typeorm");
const Parametro_1 = require("../entity/Parametro");
class PoolController {
}
exports.PoolController = PoolController;
_a = PoolController;
PoolController.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const poolRepository = (0, typeorm_1.getRepository)(Piscina_1.Piscina);
    const paramRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    let piscinas;
    try {
        const piscinasMapped = [];
        const parametrosMapped = [];
        // obtenemos piscina con sus parámetros y usuarios
        piscinas = yield poolRepository.find({ relations: ["parametros", "usuarios"] });
        // ! hace un rato no funcionaba porque estábamos usando programación funcional (forEach, map, etc)
        // y la programación funcional se comporta distinto a la imperativa (for, etc)
        // dado que las promesas se comportan de una forma con programación funcional y de otra forma con la imperativa
        // con la imperativa va paso a paso y si espera
        // con la funcional aún no sabemos exactamente por qué pero enviaba la respuesta antes de obtener los parámetros mapeados, 
        // por lo que enviaba los parámetros vacíos 
        for (const piscina of piscinas) {
            // por cada piscina recorro sus parámetros
            for (let parametro of piscina.parametros) {
                // obtengo el mismo parámetro de la piscina pero con su relación "plantilla"
                parametro = yield paramRepository.findOne(parametro.id, { relations: ["plantilla"] });
                // el nuevo parámetro lo agrego a un arreglo de parámetros
                parametrosMapped.push(parametro);
            }
            // construyo un nuevo objeto de piscina con los nuevos parámetros mapeado
            const piscinaMapped = Object.assign(Object.assign({}, piscina), { parametros: parametrosMapped });
            // lo agrego al arreglo de piscinas que daré de respuesta
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
});
PoolController.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const poolRepository = (0, typeorm_1.getRepository)(Piscina_1.Piscina);
    const paramRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    let piscina;
    const { id } = req.params;
    try {
        const parametrosMapped = [];
        // obtenemos piscina con sus parámetros y usuarios
        piscina = yield poolRepository.findOneOrFail(id, { relations: ["parametros", "usuarios"] });
        // por cada piscina recorro sus parámetros
        for (let parametro of piscina.parametros) {
            // obtengo el mismo parámetro de la piscina pero con su relación "plantilla"
            parametro = yield paramRepository.findOne(parametro.id, { relations: ["plantilla"] });
            // el nuevo parámetro lo agrego a un arreglo de parámetros
            parametrosMapped.push(parametro);
        }
        // construyo un nuevo objeto de piscina con los nuevos parámetros mapeado
        const piscinaMapped = Object.assign(Object.assign({}, piscina), { parametros: parametrosMapped });
        // lo agrego al arreglo de piscina que daré de respuesta
        if (piscinaMapped) {
            return res.json(piscinaMapped);
        }
        res.status(404).json({ message: 'Not result' });
    }
    catch (e) {
        res.status(404).json({ message: 'Something goes wrong!' });
    }
});
PoolController.newPool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo, camaronera, responsable } = req.body;
    const pool = new Piscina_1.Piscina;
    pool.codigo = codigo;
    pool.camaronera = camaronera;
    pool.responsable = responsable;
    //Validate
    const validationOpts = { validationError: { target: false, value: false } };
    const errors = yield (0, class_validator_1.validate)(pool, validationOpts);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    const poolRepository = (0, typeorm_1.getRepository)(Piscina_1.Piscina);
    try {
        yield poolRepository.save(pool);
    }
    catch (e) {
        return res.status(404).json({ message: 'Pool already exist' });
    }
    res.json('Piscina Creada!');
});
PoolController.editPool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pool;
    const { id } = req.params;
    const { codigo, componente, camaronera, responsable } = req.body;
    const poolRepository = (0, typeorm_1.getRepository)(Piscina_1.Piscina);
    try {
        pool = yield poolRepository.findOneOrFail(id);
        pool.codigo = codigo;
        pool.componente = componente;
        pool.camaronera = camaronera;
        pool.responsable = responsable;
    }
    catch (e) {
        return res.status(404).json({ message: 'Parameter not found' });
    }
    const validationOpts = { validationError: { target: false, value: false } };
    const errors = yield (0, class_validator_1.validate)(pool, validationOpts);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    //Try to save user
    try {
        yield poolRepository.save(pool);
    }
    catch (e) {
        return res.status(409).json({ message: '¡Piscina existente!' });
    }
    res.status(201).json({ message: 'Piscina Actualizada' });
});
PoolController.deletePool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const poolRepository = (0, typeorm_1.getRepository)(Piscina_1.Piscina);
    let pool;
    try {
        pool = yield poolRepository.findOneOrFail(id);
    }
    catch (e) {
        res.status(404).json({ message: 'Pool not found' });
    }
    //Remove user
    poolRepository.delete(id);
    res.status(201).json({ message: '¡Piscina Eliminada!' });
});
