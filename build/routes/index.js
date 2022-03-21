"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("./auth");
var template_1 = require("./template");
var user_1 = require("./user");
var component_1 = require("./component");
var pool_1 = require("./pool");
var user_pool_1 = require("./user_pool");
var parameter_1 = require("./parameter");
var routes = express_1.Router();
//RUTAS AUTENTICACION-LOGIN
routes.use('/auth', auth_1.default);
routes.use('/user', user_1.default);
//RUTAS PARÁMETROS
routes.use('/template', template_1.default);
//RUTAS COMPONENTES
routes.use('/component', component_1.default);
//RUTAS PISCINA
routes.use('/pool', pool_1.default);
//RUTAS USUARIO-PISCINA
routes.use('/user-pool', user_pool_1.default);
//OBTENER PARAMETROS CENSADOS
routes.use('/parameter', parameter_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map