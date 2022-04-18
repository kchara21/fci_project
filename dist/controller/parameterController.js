"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamController = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Parametro_1 = require("../entity/Parametro");
const Valor_1 = require("../entity/Valor");
const node_fetch_1 = __importDefault(require("node-fetch"));
const moment_1 = __importDefault(require("moment"));
const User_1 = require("../entity/User");
class ParamController {
}
exports.ParamController = ParamController;
_a = ParamController;
ParamController.censusParameter = async (req, res) => {
    const paramRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    const valueRepository = (0, typeorm_1.getRepository)(Valor_1.Valor);
    const userRepository = (0, typeorm_1.getRepository)(User_1.Usuario);
    let valoresApi = [];
    let API = 'https://api-esp8266-bfcd7-default-rtdb.firebaseio.com/Proyecto1.json';
    let body;
    let responsable;
    const { id, responsableId } = req.params;
    try {
        const response = await (0, node_fetch_1.default)(API);
        body = await response.json();
        valoresApi = body;
    }
    catch (e) {
        res.status(404).json({ message: 'Algo salió mal!' });
    }
    try {
        const usuario = await userRepository.findOneOrFail(responsableId);
        responsable = usuario.nombre;
    }
    catch (e) {
        res.status(404).json({ message: 'No hay resultado' });
    }
    try {
        const parametros = await paramRepository
            .createQueryBuilder("param")
            .where("param.piscina.id = :id", { id })
            .getMany();
        if (parametros.length < 1) {
            return res.json({ message: "Piscina sin parametros asignados" });
        }
        for (let parametro of parametros) {
            parametro = await paramRepository.findOne(parametro.id, { relations: ["valores", "plantilla"] });
            let nombreApi = Object.keys(valoresApi);
            let valorApi = Object.values(valoresApi);
            for (let i = 0; i <= nombreApi.length; i++) {
                if (parametro.nombre === nombreApi[i]) {
                    const value = new Valor_1.Valor();
                    value.createdAt = (0, moment_1.default)().subtract(5, 'hours').toDate();
                    value.valor = valorApi[i];
                    value.responsable = responsable;
                    if (valorApi[i] >= parametro.plantilla.valor_minimo && valorApi[i] <= parametro.plantilla.valor_maximo) {
                        value.estado = "Aceptable";
                    }
                    else {
                        value.estado = "Revisar";
                    }
                    value.parametro = parametro;
                    await valueRepository.save(value);
                }
            }
        }
        res.json({ message: "Valores guardados!" });
    }
    catch (e) {
        res.status(404).json({ message: 'No hay resultados' });
    }
};
ParamController.getAll = async (req, res) => {
    const poolRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    let parameters;
    try {
        parameters = await poolRepository.find({ relations: ["plantilla", "piscina", "valores"] });
    }
    catch (e) {
        res.status(404).json({ message: 'Algo salió mal!' });
    }
    (parameters.length > 0)
        ? res.json(parameters)
        : res.status(404).json({ message: 'No hay resultados' });
};
ParamController.getByPool = async (req, res) => {
    const { piscina } = req.params;
    let parameters;
    let paramsByPool = [];
    const poolRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    try {
        parameters = await poolRepository.find({ relations: ["plantilla", "piscina", "valores"] });
        for (let param of parameters) {
            if (param.piscina.codigo === piscina) {
                paramsByPool.push(param);
            }
        }
    }
    catch (e) {
        res.status(404).json({ message: 'Algo salio mal!' });
    }
    (paramsByPool.length > 0)
        ? res.json(paramsByPool)
        : res.status(404).json({ message: 'No se encontraron parametros' });
};
ParamController.newParam = async (req, res) => {
    const { codigo, nombre, plantilla, piscina } = req.body;
    const param = new Parametro_1.Parametro;
    param.codigo = codigo;
    param.nombre = nombre;
    param.plantilla = plantilla;
    param.piscina = piscina;
    const validationOpts = { validationError: { target: false, value: false } };
    const errors = await (0, class_validator_1.validate)(param, validationOpts);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    const poolRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    try {
        const paramExist = await poolRepository.find({ where: { piscina: piscina, nombre: nombre } });
        if (paramExist.length > 0) {
            return res.json({ message: `Parametro existente en la piscina seleccionada` });
        }
        await poolRepository.save(param);
    }
    catch (e) {
        return res.status(404).json({ message: 'Parametro existente' });
    }
    res.json('Parametro Creado!');
};
ParamController.editParam = async (req, res) => {
    let param;
    const { id } = req.params;
    const { codigo, nombre, plantilla, piscina } = req.body;
    const paramRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    try {
        param = await paramRepository.findOneOrFail(id);
        param.codigo = codigo;
        param.nombre = nombre;
        param.plantilla = plantilla;
        param.piscina = piscina;
    }
    catch (e) {
        return res.status(404).json({ message: 'Parametro no funciona' });
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
        return res.status(409).json({ message: '¡Parametro en uso!' });
    }
    res.status(201).json({ message: '¡Parametro actualizado!' });
};
ParamController.deleteParam = async (req, res) => {
    const { id } = req.params;
    const paramRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    let param;
    try {
        param = await paramRepository.findOneOrFail(id);
    }
    catch (e) {
        res.status(404).json({ message: 'Parametro no encontrado' });
    }
    paramRepository.delete(id);
    res.status(201).json({ message: '¡Parametro eliminado!' });
};
//# sourceMappingURL=parameterController.js.map