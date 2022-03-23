"use strict";
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
(0, typeorm_1.createConnection)().then(async (connection) => {
    console.log('DB Connected');
}).catch(err => console.log(err));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        console.log('hola');
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, cors_1.default)({ credentials: true }));
        this.app.use((0, helmet_1.default)({
            contentSecurityPolicy: false,
        }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
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
//# sourceMappingURL=index.js.map