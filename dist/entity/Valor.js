"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Valor = void 0;
const typeorm_1 = require("typeorm");
const Parametro_1 = require("./Parametro");
let Valor = class Valor {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Valor.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Parametro_1.Parametro, parametro => parametro.valores, { onDelete: 'CASCADE' }),
    __metadata("design:type", Parametro_1.Parametro)
], Valor.prototype, "parametro", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Valor.prototype, "valor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Valor.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Valor.prototype, "responsable", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Valor.prototype, "createdAt", void 0);
Valor = __decorate([
    (0, typeorm_1.Entity)()
], Valor);
exports.Valor = Valor;
//# sourceMappingURL=Valor.js.map