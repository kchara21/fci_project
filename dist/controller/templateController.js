"use strict";
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
TemplateController.getAll = async (req, res) => {
    const paramRepository = (0, typeorm_1.getRepository)(Plantilla_1.Plantilla);
    let params;
    try {
        params = await paramRepository.find({ relations: ["parametros"] });
    }
    catch (e) {
        res.status(404).json({ message: 'Algo salió mal!' });
    }
    (params.length > 0)
        ? res.json(params)
        : res.status(404).json({ message: 'No hay resultados' });
};
TemplateController.getById = async (req, res) => {
    const { id } = req.params;
    const paramRepository = (0, typeorm_1.getRepository)(Plantilla_1.Plantilla);
    try {
        const param = await paramRepository.findOneOrFail(id, { relations: ["parametros"] });
        res.json(param);
    }
    catch (e) {
        res.status(404).json({ message: 'No hay resultados' });
    }
};
TemplateController.getTemplateByPool = async (req, res) => {
    const poolRepository = (0, typeorm_1.getRepository)(Piscina_1.Piscina);
    const paramRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    let piscina;
    const { id } = req.params;
    try {
        const parametrosMapped = [];
        piscina = await poolRepository.findOneOrFail(id, { relations: ["parametros", "usuarios"] });
        for (let parametro of piscina.parametros) {
            parametro = await paramRepository.findOne(parametro.id, { relations: ["plantilla"] });
            parametrosMapped.push(parametro.plantilla);
        }
        const piscinaMapped = parametrosMapped;
        if (piscinaMapped) {
            return res.json(piscinaMapped);
        }
        res.status(404).json({ message: 'No hay resultados' });
    }
    catch (e) {
        res.status(404).json({ message: 'Algo salió mal' });
    }
};
TemplateController.getByParam = async (req, res) => {
    const { nombre } = req.params;
    const paramRepository = (0, typeorm_1.getRepository)(Plantilla_1.Plantilla);
    let plantillas;
    try {
        plantillas = await paramRepository.find({ relations: ['parametros'], where: { nombre } });
    }
    catch (e) {
        res.status(404).json({ message: 'Algo salió mal' });
    }
    (plantillas.length > 0)
        ? res.json(plantillas)
        : res.status(404).json({ message: 'No hay resultados' });
};
TemplateController.newParam = async (req, res) => {
    const { codigo, nombre, valor_maximo, valor_minimo } = req.body;
    const param = new Plantilla_1.Plantilla();
    param.codigo = codigo;
    param.nombre = nombre;
    param.valor_maximo = valor_maximo;
    param.valor_minimo = valor_minimo;
    const validationOpts = { validationError: { target: false, value: false } };
    const errors = await (0, class_validator_1.validate)(param, validationOpts);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    const paramRepository = (0, typeorm_1.getRepository)(Plantilla_1.Plantilla);
    try {
        await paramRepository.save(param);
    }
    catch (e) {
        return res.status(404).json({ message: '¡Esta plantilla ya existe!' });
    }
    res.json({ message: '¡Plantilla Creada!' });
};
TemplateController.editParam = async (req, res) => {
    let param;
    const { id } = req.params;
    const { codigo, nombre, valor_maximo, valor_minimo } = req.body;
    const paramRepository = (0, typeorm_1.getRepository)(Plantilla_1.Plantilla);
    try {
        param = await paramRepository.findOneOrFail(id);
        param.codigo = codigo;
        param.nombre = nombre;
        param.valor_maximo = valor_maximo;
        param.valor_minimo = valor_minimo;
    }
    catch (e) {
        return res.status(404).json({ message: 'Plantilla no funciona' });
    }
    const validationOpts = { validationError: { target: false, value: false } };
    const errors = await (0, class_validator_1.validate)(param, validationOpts);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    try {
        await paramRepository.save(param);
    }
    catch (e) {
        return res.status(409).json({ message: 'Plantilla existente' });
    }
    res.status(201).json({ message: '¡Plantilla Actualizada!' });
};
TemplateController.deleteParam = async (req, res) => {
    const { id } = req.params;
    const paramRepository = (0, typeorm_1.getRepository)(Plantilla_1.Plantilla);
    let param;
    try {
        param = await paramRepository.findOneOrFail(id);
    }
    catch (e) {
        res.status(404).json({ message: 'Parametro no funciona' });
    }
    paramRepository.delete(id);
    res.status(201).json({ message: 'Parametro eliminado' });
};
//# sourceMappingURL=templateController.js.map