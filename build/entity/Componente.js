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
var typeorm_1 = require("typeorm");
var class_validator_1 = require("class-validator");
var Parametro_1 = require("./Parametro");
var Piscina_1 = require("./Piscina");
var Componente = /** @class */ (function () {
    function Componente() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Componente.prototype, "id", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Parametro_1.Parametro; }, function (parametro) { return parametro.componente; }),
        __metadata("design:type", Array)
    ], Componente.prototype, "parametros", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Piscina_1.Piscina; }, function (piscina) { return piscina.componente; }),
        __metadata("design:type", Array)
    ], Componente.prototype, "piscinas", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar' }),
        class_validator_1.MinLength(6),
        __metadata("design:type", String)
    ], Componente.prototype, "codigo", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.MinLength(2),
        __metadata("design:type", String)
    ], Componente.prototype, "nombre", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Componente.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Componente.prototype, "updateAt", void 0);
    Componente = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique(['codigo'])
    ], Componente);
    return Componente;
}());
exports.Componente = Componente;
//# sourceMappingURL=Componente.js.map