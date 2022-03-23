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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
class ApiController {
}
exports.ApiController = ApiController;
_a = ApiController;
ApiController.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let API = 'https://api-esp8266-bfcd7-default-rtdb.firebaseio.com/Proyecto1.json'; //TODO: poner la API como variable de entorno
    let body;
    try {
        const response = yield (0, node_fetch_1.default)(API);
        body = yield response.json();
    }
    catch (e) {
        res.status(404).json({ message: 'Something goes wrong!' });
    }
    (body)
        ? res.json(body)
        : res.status(404).json({ message: 'Not result' });
});
