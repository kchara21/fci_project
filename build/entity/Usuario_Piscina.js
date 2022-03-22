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
var User_1 = require("./User");
var Piscina_1 = require("./Piscina");
var Usuario_Piscina = /** @class */ (function () {
    function Usuario_Piscina() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Usuario_Piscina.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar' }),
        class_validator_1.MinLength(6),
        __metadata("design:type", String)
    ], Usuario_Piscina.prototype, "codigo", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return User_1.Usuario; }, function (usuario) { return usuario.usuarios_piscinas; }),
        __metadata("design:type", User_1.Usuario)
    ], Usuario_Piscina.prototype, "usuario", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Piscina_1.Piscina; }, function (piscina) { return piscina.usuarios_piscinas; }),
        __metadata("design:type", Piscina_1.Piscina)
    ], Usuario_Piscina.prototype, "piscina", void 0);
    Usuario_Piscina = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique(['codigo'])
    ], Usuario_Piscina);
    return Usuario_Piscina;
}());
exports.Usuario_Piscina = Usuario_Piscina;
//# sourceMappingURL=Usuario_Piscina.js.map