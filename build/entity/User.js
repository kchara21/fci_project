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
var bcrypt = require("bcryptjs");
var Usuario_Piscina_1 = require("./Usuario_Piscina");
var Usuario = /** @class */ (function () {
    function Usuario() {
    }
    Usuario.prototype.hashPassword = function () {
        var salt = bcrypt.genSaltSync(10);
        this.clave = bcrypt.hashSync(this.clave, salt);
    };
    Usuario.prototype.checkPassword = function (clave) {
        return bcrypt.compareSync(clave, this.clave);
    };
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Usuario.prototype, "id", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Usuario_Piscina_1.Usuario_Piscina; }, function (usuario_piscina) { return usuario_piscina.usuario; }),
        __metadata("design:type", Array)
    ], Usuario.prototype, "usuarios_piscinas", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.MinLength(6),
        __metadata("design:type", String)
    ], Usuario.prototype, "nombre", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.MinLength(6),
        class_validator_1.IsEmail(),
        __metadata("design:type", String)
    ], Usuario.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.MinLength(6),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], Usuario.prototype, "clave", void 0);
    __decorate([
        typeorm_1.Column(),
        class_validator_1.IsNotEmpty(),
        __metadata("design:type", String)
    ], Usuario.prototype, "rol", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Usuario.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Usuario.prototype, "updateAt", void 0);
    Usuario = __decorate([
        typeorm_1.Entity(),
        typeorm_1.Unique(['email']) //Ese es un que SERA UNICO 
    ], Usuario);
    return Usuario;
}());
exports.Usuario = Usuario;
//# sourceMappingURL=User.js.map