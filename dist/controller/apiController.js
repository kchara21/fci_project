"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class ApiController {
}
exports.ApiController = ApiController;
_a = ApiController;
ApiController.getAll = async (req, res) => {
    let API = 'https://api-esp8266-bfcd7-default-rtdb.firebaseio.com/Proyecto1.json';
    let body;
    try {
        const response = await (0, node_fetch_1.default)(API);
        body = await response.json();
    }
    catch (e) {
        res.status(404).json({ message: 'Algo salió mal!' });
    }
    (body)
        ? res.json(body)
        : res.status(404).json({ message: 'No hay Resultado' });
};
//# sourceMappingURL=apiController.js.map