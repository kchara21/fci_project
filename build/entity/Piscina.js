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
var Reporte_1 = require("./Reporte");
var Usuario_Piscina_1 = require("./Usuario_Piscina");
var Piscina = /** @class */ (function () {
    function Piscina() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Piscina.prototype, "id", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Usuario_Piscina_1.Usuario_Piscina; }, function (usuario_piscina) { return usuario_piscina.piscina; }),
        __metadata("design:type", Array)
    ], Piscina.prototype, "usuarios_piscinas", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Componente_1.Componente; }, function (componente) { return componente.piscinas; }),
        __metadata("design:type", Componente_1.Componente)
    ], Piscina.prototype, "componente", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Reporte_1.Reporte; }, function (reporte) { return reporte.piscina; }),
        __metadata("design:type", Array)
    ], Piscina.prototype, "reportes", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.MinLength(4),
        __metadata("design:type", String)
    ], Piscina.prototype, "camaronera", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.MinLength(4),
        __metadata("design:type", String)
    ], Piscina.prototype, "responsable", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar' }),
        class_validator_1.MinLength(6),
        __metadata("design:type", String)
    ], Piscina.prototype, "codigo", void 0);
    Piscina = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique(['codigo'])
    ], Piscina);
    return Piscina;
}());
exports.Piscina = Piscina;
//# sourceMappingURL=Piscina.js.map