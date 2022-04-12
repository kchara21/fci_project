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
exports.Piscina = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const Parametro_1 = require("./Parametro");
const User_1 = require("./User");
let Piscina = class Piscina {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Piscina.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1.Usuario, (usuario) => usuario.piscinas, { onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], Piscina.prototype, "usuarios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Parametro_1.Parametro, parametro => parametro.piscina),
    __metadata("design:type", Array)
], Piscina.prototype, "parametros", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], Piscina.prototype, "camaronera", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(4),
    __metadata("design:type", String)
], Piscina.prototype, "responsable", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], Piscina.prototype, "codigo", void 0);
Piscina = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['codigo'])
], Piscina);
exports.Piscina = Piscina;
//# sourceMappingURL=Piscina.js.map