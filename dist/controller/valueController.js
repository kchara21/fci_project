"use strict";
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
ValueController.getByDate = async (req, res) => {
    const valueRepository = (0, typeorm_1.getRepository)(Valor_1.Valor);
    const paramRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    const { pool, parameter, start, end } = req.params;
    let valuesParam;
    let valParPool = [];
    const BetweenDates = (from, to) => (0, typeorm_1.Between)((0, date_fns_1.format)(typeof from === 'string' ? new Date(from) : from, 'yyyy-MM-dd'), (0, date_fns_1.format)(typeof to === 'string' ? new Date(to) : to, 'yyyy-MM-dd'));
    try {
        valuesParam = await valueRepository.find({ relations: ["parametro"], where: { createdAt: BetweenDates(start, end) } });
    }
    catch (e) {
        res.status(404).json({ message: 'Something goes wrong!' });
    }
    for (let value of valuesParam) {
        value.parametro = await paramRepository.findOneOrFail(value.parametro.id, { relations: ["piscina", "plantilla"] });
        if ((value.parametro.piscina.id) === Number(pool) && parameter === 'TODOS') {
            valParPool.push(value);
        }
        else if ((value.parametro.piscina.id) === Number(pool) && parameter === value.parametro.nombre) {
            valParPool.push(value);
        }
    }
    (valParPool.length > 0)
        ? res.json({ valParPool })
        : res.status(404).json({ message: 'No se encontraron valores' });
};
ValueController.reportByPool = async (req, res) => {
    const valueRepository = (0, typeorm_1.getRepository)(Valor_1.Valor);
    const paramRepository = (0, typeorm_1.getRepository)(Parametro_1.Parametro);
    const { pool } = req.params;
    let valuesParam;
    let valParPool = [];
    try {
        valuesParam = await valueRepository.find({ relations: ["parametro"] });
    }
    catch (e) {
        res.status(404).json({ message: 'Something goes wrong!' });
    }
    for (let value of valuesParam) {
        value.parametro = await paramRepository.findOneOrFail(value.parametro.id, { relations: ["piscina", "plantilla"] });
        if ((value.parametro.piscina.id) === Number(pool)) {
            valParPool.push(value);
        }
    }
    (valParPool.length > 0)
        ? res.json({ valParPool })
        : res.json({ message: 'No se encontraron valores' });
};
exports.default = ValueController;
//# sourceMappingURL=valueController.js.map