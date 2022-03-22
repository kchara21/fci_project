"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var class_validator_1 = require("class-validator");
var Piscina_1 = require("../entity/Piscina");
var typeorm_1 = require("typeorm");
var PoolController = /** @class */ (function () {
    function PoolController() {
    }
    PoolController.newPool = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var _a, codigo, componenteId, camaronera, responsable, pool, validationOpts, errors, poolRepository, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, codigo = _a.codigo, componenteId = _a.componenteId, camaronera = _a.camaronera, responsable = _a.responsable;
                    pool = new Piscina_1.Piscina;
                    pool.codigo = codigo;
                    pool.componente = componenteId;
                    pool.camaronera = camaronera;
                    pool.responsable = responsable;
                    validationOpts = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(pool, validationOpts)];
                case 1:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    poolRepository = typeorm_1.getRepository(Piscina_1.Piscina);
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, poolRepository.save(pool)];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _b.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Pool already exist' })];
                case 5:
                    res.send('Pool Created!');
                    return [2 /*return*/];
            }
        });
    }); };
    PoolController.getAll = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var poolRepository, components, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    poolRepository = typeorm_1.getRepository(Piscina_1.Piscina);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, poolRepository.find({ relations: ["componente", "usuarios_piscinas"] })];
                case 2:
                    components = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    res.status(404).json({ message: 'Something goes wrong!' });
                    return [3 /*break*/, 4];
                case 4:
                    (components.length > 0)
                        ? res.send(components)
                        : res.status(404).json({ message: 'Not result' });
                    return [2 /*return*/];
            }
        });
    }); };
    PoolController.getById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, poolRepository, pool, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    poolRepository = typeorm_1.getRepository(Piscina_1.Piscina);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, poolRepository.findOneOrFail(id, { relations: ["componente", "usuarios_piscinas"] })];
                case 2:
                    pool = _a.sent();
                    res.send(pool);
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    res.status(404).json({ message: 'Not Result' });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    PoolController.editPool = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var pool, id, _a, codigo, componenteId, camaronera, responsable, poolRepository, e_4, validationOpts, errors, e_5;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    id = req.params.id;
                    _a = req.body, codigo = _a.codigo, componenteId = _a.componenteId, camaronera = _a.camaronera, responsable = _a.responsable;
                    poolRepository = typeorm_1.getRepository(Piscina_1.Piscina);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, poolRepository.findOneOrFail(id)];
                case 2:
                    pool = _b.sent();
                    pool.codigo = codigo;
                    pool.componente = componenteId;
                    pool.camaronera = camaronera;
                    pool.responsable = responsable;
                    return [3 /*break*/, 4];
                case 3:
                    e_4 = _b.sent();
                    return [2 /*return*/, res.status(404).json({ message: 'Parameter not found' })];
                case 4:
                    validationOpts = { validationError: { target: false, value: false } };
                    return [4 /*yield*/, class_validator_1.validate(pool, validationOpts)];
                case 5:
                    errors = _b.sent();
                    if (errors.length > 0) {
                        return [2 /*return*/, res.status(400).json(errors)];
                    }
                    _b.label = 6;
                case 6:
                    _b.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, poolRepository.save(pool)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 8:
                    e_5 = _b.sent();
                    return [2 /*return*/, res.status(409).json({ message: 'Pool already in use' })];
                case 9:
                    res.status(201).json({ message: 'Pool Update' });
                    return [2 /*return*/];
            }
        });
    }); };
    PoolController.deletePool = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, poolRepository, pool, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    poolRepository = typeorm_1.getRepository(Piscina_1.Piscina);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, poolRepository.findOneOrFail(id)];
                case 2:
                    pool = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_6 = _a.sent();
                    res.status(404).json({ message: 'Pool not found' });
                    return [3 /*break*/, 4];
                case 4:
                    //Remove user
                    poolRepository.delete(id);
                    res.status(201).json({ message: 'Pool deleted' });
                    return [2 /*return*/];
            }
        });
    }); };
    return PoolController;
}());
exports.PoolController = PoolController;
//# sourceMappingURL=poolController.js.map