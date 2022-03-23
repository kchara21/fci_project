"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const bcrypt = __importStar(require("bcryptjs"));
const Piscina_1 = require("./Piscina");
let Usuario = class Usuario {
    hashPassword() {
        const salt = bcrypt.genSaltSync(10);
        this.clave = bcrypt.hashSync(this.clave, salt);
    }
    checkPassword(clave) {
        return bcrypt.compareSync(clave, this.clave);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Piscina_1.Piscina, (piscina) => piscina.usuarios),
    (0, typeorm_1.JoinTable)({
        name: 'user_pool',
        joinColumn: {
            name: 'user_id',
        },
        inverseJoinColumn: {
            name: 'pool_id',
        },
    }),
    __metadata("design:type", Array)
], Usuario.prototype, "piscinas", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Usuario.prototype, "clave", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Usuario.prototype, "rol", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Usuario.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Usuario.prototype, "updateAt", void 0);
Usuario = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['email']) //Ese es un que SERA UNICO
], Usuario);
exports.Usuario = Usuario;
