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
exports.TemplateController = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Plantilla_1 = require("../entity/Plantilla");
const Parametro_1 = require("../entity/Parametro");
const Piscina_1 = require("../entity/Piscina");
class TemplateController {
}
exports.TemplateController = TemplateController;
_a = TemplateController;
TemplateController.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paramRepository = (0, typeorm_1.getRepository)(Plantilla_1.Plantilla);
    let params;
    try {
        params = yield paramRepository.find({ relations: ["parametros"] });
    }
    catch (e) {
        res.status(404).json({ message: 'Something goes wrong!' });
    }
    (params.length > 0)
        ? res.json(params)
        : res.status(404).json({ message: 'Not result' });
});
TemplateController.getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const paramRepository = (0, typeorm_1.getRepository)(Plantilla_1.Plantilla);
    try {
        const param = yield paramRepository.findOneOrFail(id, { relations: ["parametros"] });
        res.json(param);
    }
    catch (e) {
        res.status(404).json({ message: 'Not Result' });
    }
});
TemplateController.getTemplateByPool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            parametrosMapped.push(parametro.plantilla);
        }
        // construyo un nuevo objeto de piscina con los nuevos parámetros mapeado
        const piscinaMapped = parametrosMapped;
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
TemplateController.getByParam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    const paramRepository = (0, typeorm_1.getRepository)(Plantilla_1.Plantilla);
    let plantillas;
    try {
        plantillas = yield paramRepository.find({ relations: ['parametros'], where: { nombre } });
    }
    catch (e) {
        res.status(404).json({ message: 'Something goes wrong!' });
    }
    (plantillas.length > 0)
        ? res.json(plantillas)
        : res.status(404).json({ message: 'Not result' });
});
TemplateController.newParam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo, nombre, valor_maximo, valor_minimo } = req.body;
    const param = new Plantilla_1.Plantilla();
    param.codigo = codigo;
    param.nombre = nombre;
    param.valor_maximo = valor_maximo;
    param.valor_minimo = valor_minimo;
    //Validate
    const validationOpts = { validationError: { target: false, value: false } };
    const errors = yield (0, class_validator_1.validate)(param, validationOpts);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    const paramRepository = (0, typeorm_1.getRepository)(Plantilla_1.Plantilla);
    try {
        yield paramRepository.save(param);
    }
    catch (e) {
        return res.status(404).json({ message: '¡Esta plantilla ya existe!' });
    }
    res.json({ message: '¡Plantilla Creada!' });
});
TemplateController.editParam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let param;
    const { id } = req.params;
    const { codigo, nombre, valor_maximo, valor_minimo } = req.body;
    const paramRepository = (0, typeorm_1.getRepository)(Plantilla_1.Plantilla);
    try {
        param = yield paramRepository.findOneOrFail(id);
        param.codigo = codigo;
        param.nombre = nombre;
        param.valor_maximo = valor_maximo;
        param.valor_minimo = valor_minimo;
    }
    catch (e) {
        return res.status(404).json({ message: 'Parameter not found' });
    }
    const validationOpts = { validationError: { target: false, value: false } };
    const errors = yield (0, class_validator_1.validate)(param, validationOpts);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    //Try to save user
    try {
        yield paramRepository.save(param);
    }
    catch (e) {
        return res.status(409).json({ message: 'Plantilla existente' });
    }
    res.status(201).json({ message: '¡Plantilla Actualizada!' });
});
TemplateController.deleteParam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const paramRepository = (0, typeorm_1.getRepository)(Plantilla_1.Plantilla);
    let param;
    try {
        param = yield paramRepository.findOneOrFail(id);
    }
    catch (e) {
        res.status(404).json({ message: 'Parameter not found' });
    }
    //Remove user
    paramRepository.delete(id);
    res.status(201).json({ message: 'Parametro eliminado' });
});
