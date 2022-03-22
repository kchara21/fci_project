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
exports.Parametro = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const Plantilla_1 = require("./Plantilla");
const Piscina_1 = require("./Piscina");
const Valor_1 = require("./Valor");
let Parametro = class Parametro {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Parametro.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Plantilla_1.Plantilla, plantilla => plantilla.parametros),
    __metadata("design:type", Plantilla_1.Plantilla)
], Parametro.prototype, "plantilla", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Piscina_1.Piscina, piscina => piscina.parametros, { onDelete: 'CASCADE' }),
    __metadata("design:type", Piscina_1.Piscina)
], Parametro.prototype, "piscina", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], Parametro.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], Parametro.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Valor_1.Valor, valor => valor.parametro),
    __metadata("design:type", Array)
], Parametro.prototype, "valores", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Parametro.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Parametro.prototype, "updateAt", void 0);
Parametro = __decorate([
    (0, typeorm_1.Entity)()
], Parametro);
exports.Parametro = Parametro;
//# sourceMappingURL=Parametro.js.map