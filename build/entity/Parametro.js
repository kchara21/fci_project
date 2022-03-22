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
var Componente_1 = require("./Componente");
var Plantilla_1 = require("./Plantilla");
var Parametro = /** @class */ (function () {
    function Parametro() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Parametro.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Componente_1.Componente; }, function (componente) { return componente.parametros; }),
        __metadata("design:type", Componente_1.Componente)
    ], Parametro.prototype, "componente", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Plantilla_1.Plantilla; }, function (plantilla) { return plantilla.parametros; }),
        __metadata("design:type", Plantilla_1.Plantilla)
    ], Parametro.prototype, "plantilla", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.MinLength(6),
        __metadata("design:type", String)
    ], Parametro.prototype, "codigo", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Parametro.prototype, "nombre", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Parametro.prototype, "valor", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Parametro.prototype, "descripcion", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Parametro.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Parametro.prototype, "updateAt", void 0);
    Parametro = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique(['codigo'])
    ], Parametro);
    return Parametro;
}());
exports.Parametro = Parametro;
//# sourceMappingURL=Parametro.js.map