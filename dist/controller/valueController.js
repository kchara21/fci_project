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
exports.ValueController = void 0;
const date_fns_1 = require("date-fns");
const typeorm_1 = require("typeorm");
const Parametro_1 = require("../entity/Parametro");
const Valor_1 = require("../entity/Valor");
class ValueController {
}
exports.ValueController = ValueController;
_a = ValueController;
ValueController.getByDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const valueRepository = (0, typeorm_1.getRepository)(Valor_1.Valor);
    const paramRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    const { pool, parameter, start, end } = req.params;
    let valuesParam;
    let valParPool = [];
    const BetweenDates = (from, to) => (0, typeorm_1.Between)((0, date_fns_1.format)(typeof from === 'string' ? new Date(from) : from, 'yyyy-MM-dd'), (0, date_fns_1.format)(typeof to === 'string' ? new Date(to) : to, 'yyyy-MM-dd'));
    try {
        valuesParam = yield valueRepository.find({
            relations: ['parametro'],
            where: { createdAt: BetweenDates(start, end) },
        });
    }
    catch (e) {
        res.status(404).json({ message: 'Something goes wrong!' });
    }
    for (let value of valuesParam) {
        value.parametro = yield paramRepository.findOneOrFail(value.parametro.id, { relations: ['piscina', 'plantilla'] });
        if (value.parametro.piscina.id === Number(pool) &&
            parameter === 'TODOS') {
            valParPool.push(value);
        }
        else if (value.parametro.piscina.id === Number(pool) &&
            parameter === value.parametro.nombre) {
            valParPool.push(value);
        }
    }
    valParPool.length > 0
        ? res.json({ valParPool })
        : res.json({ message: 'No se encontraron valores' });
});
ValueController.reportByPool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const valueRepository = (0, typeorm_1.getRepository)(Valor_1.Valor);
    const paramRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    const { pool } = req.params;
    let valuesParam;
    let valParPool = [];
    try {
        valuesParam = yield valueRepository.find({ relations: ['parametro'] });
    }
    catch (e) {
        res.status(404).json({ message: 'Something goes wrong!' });
    }
    for (let value of valuesParam) {
        value.parametro = yield paramRepository.findOneOrFail(value.parametro.id, { relations: ['piscina', 'plantilla'] });
        if (value.parametro.piscina.id === Number(pool)) {
            valParPool.push(value);
        }
    }
    valParPool.length > 0
        ? res.json({ valParPool })
        : res.json({ message: 'No se encontraron valores' });
});
exports.default = ValueController;
