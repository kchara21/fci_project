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
const User_1 = require("../entity/User");
class ParamController {
}
exports.ParamController = ParamController;
_a = ParamController;
ParamController.censusParameter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paramRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    const valueRepository = (0, typeorm_1.getRepository)(Valor_1.Valor);
    const userRepository = (0, typeorm_1.getRepository)(User_1.Usuario);
    let valoresApi = [];
    let API = 'https://api-esp8266-bfcd7-default-rtdb.firebaseio.com/Proyecto1.json'; //TODO: poner la API como variable de entorno
    let body;
    let responsable;
    const { id, responsableId } = req.params;
    try {
        const response = yield (0, node_fetch_1.default)(API);
        body = yield response.json();
        valoresApi = body;
    }
    catch (e) {
        res.status(404).json({ message: 'Something goes wrong!' });
    }
    try {
        const usuario = yield userRepository.findOneOrFail(responsableId);
        responsable = usuario.nombre;
    }
    catch (e) {
        res.status(404).json({ message: 'Not Result' });
    }
    try {
        const parametros = yield paramRepository
            .createQueryBuilder("param")
            .where("param.piscina.id = :id", { id })
            .getMany();
        if (parametros.length < 1) {
            return res.json({ message: "Piscina sin parametros asignados" });
        }
        for (let parametro of parametros) {
            parametro = yield paramRepository.findOne(parametro.id, { relations: ["valores", "plantilla"] });
            let nombreApi = Object.keys(valoresApi);
            let valorApi = Object.values(valoresApi);
            for (let i = 0; i <= nombreApi.length; i++) {
                if (parametro.nombre === nombreApi[i]) {
                    const value = new Valor_1.Valor();
                    value.valor = valorApi[i];
                    value.responsable = responsable;
                    if (valorApi[i] >= parametro.plantilla.valor_minimo && valorApi[i] <= parametro.plantilla.valor_maximo) {
                        value.estado = "aceptable";
                    }
                    else {
                        value.estado = "revisar";
                    }
                    value.parametro = parametro;
                    yield valueRepository.save(value);
                }
            }
        }
        res.json({ message: "Valores guardados!" });
    }
    catch (e) {
        res.status(404).json({ message: 'Not Result' });
    }
});
ParamController.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const poolRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    let parameters;
    try {
        parameters = yield poolRepository.find({ relations: ["plantilla", "piscina", "valores"] });
    }
    catch (e) {
        res.status(404).json({ message: 'Something goes wrong!' });
    }
    (parameters.length > 0)
        ? res.json(parameters)
        : res.status(404).json({ message: 'Not result' });
});
ParamController.getByPool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { piscina } = req.params;
    let parameters;
    let paramsByPool = [];
    const poolRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    try {
        parameters = yield poolRepository.find({ relations: ["plantilla", "piscina", "valores"] });
        for (let param of parameters) {
            console.log(param.piscina.codigo);
            console.log(piscina);
            if (param.piscina.codigo === piscina) {
                paramsByPool.push(param);
            }
        }
    }
    catch (e) {
        res.status(404).json({ message: 'Something goes wrong!' });
    }
    (paramsByPool.length > 0)
        ? res.json(paramsByPool)
        : res.status(404).json({ message: 'No se encontraron parametros' });
});
ParamController.newParam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo, nombre, plantilla, piscina } = req.body;
    const param = new Parametro_1.Parametro;
    param.codigo = codigo;
    param.nombre = nombre;
    param.plantilla = plantilla;
    param.piscina = piscina;
    //Validate
    const validationOpts = { validationError: { target: false, value: false } };
    const errors = yield (0, class_validator_1.validate)(param, validationOpts);
    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    const poolRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    try {
        //Validate if exist a param with the same pool
        const paramExist = yield poolRepository.find({ where: { piscina: piscina, nombre: nombre } });
        if (paramExist.length > 0) {
            return res.json({ message: `Parametro existente en la piscina seleccionada` });
        }
        yield poolRepository.save(param);
    }
    catch (e) {
        return res.status(404).json({ message: 'Parameter already exist' });
    }
    res.json('Parametro Creado!');
});
ParamController.editParam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let param;
    const { id } = req.params;
    const { codigo, nombre, plantilla, piscina } = req.body;
    const paramRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    const poolRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    try {
        param = yield paramRepository.findOneOrFail(id);
        param.codigo = codigo;
        param.nombre = nombre;
        param.plantilla = plantilla;
        param.piscina = piscina;
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
        return res.status(409).json({ message: '¡Parametro en uso!' });
    }
    res.status(201).json({ message: '¡Parametro actualizado!' });
});
ParamController.deleteParam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const paramRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    let param;
    try {
        param = yield paramRepository.findOneOrFail(id);
    }
    catch (e) {
        res.status(404).json({ message: 'Parameter not found' });
    }
    //Remove user
    paramRepository.delete(id);
    res.status(201).json({ message: '¡Parametro eliminado!' });
});
