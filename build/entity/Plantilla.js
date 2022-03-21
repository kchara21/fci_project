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
var Plantilla = /** @class */ (function () {
    function Plantilla() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Plantilla.prototype, "id", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Parametro_1.Parametro; }, function (parametro) { return parametro.plantilla; }),
        __metadata("design:type", Array)
    ], Plantilla.prototype, "parametros", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.MinLength(6),
        __metadata("design:type", String)
    ], Plantilla.prototype, "codigo", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Plantilla.prototype, "nombre", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Plantilla.prototype, "valor_deseado", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Plantilla.prototype, "valor_maximo", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Plantilla.prototype, "valor_minimo", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Plantilla.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Plantilla.prototype, "updateAt", void 0);
    Plantilla = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique(['codigo'])
    ], Plantilla);
    return Plantilla;
}());
exports.Plantilla = Plantilla;
//# sourceMappingURL=Plantilla.js.map