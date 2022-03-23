"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const helmet_1 = __importDefault(require("helmet"));
const typeorm_1 = require("typeorm");
(0, typeorm_1.createConnection)().then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('DB Connected');
})).catch(err => console.log(err));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        //Middlewares
        this.app.use((0, cors_1.default)({ credentials: true })); // Obtener permiso para acceder a recursos seleccionados desde un servidor, en un origen distinto (dominio) al que pertenece.
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json()); // Para poder recibir datos JSON y entenderlos.
        this.app.use(express_1.default.urlencoded({ extended: false })); // Em caso de querer enviar desde un form. HTML
    }
    routes() {
        this.app.use('/', routes_1.default);
        this.app.use(express_1.default.static('public'));
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port`, this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
