import {Router} from 'express';
import auth from './auth';
import template from './template';
import user from './user';
import pool from './pool';
import api from './api';
import value from './value';
import  parameter from './parameter'

const routes = Router();

//RUTAS AUTENTICACION-LOGIN
routes.use('/auth',auth);
routes.use('/user',user);


//RUTAS PARÁMETROS
routes.use('/template',template);


//RUTAS PISCINA
routes.use('/pool',pool);


//RUTA API
routes.use('/api',api);


//RUTA PARAMETROS
routes.use('/parameter',parameter);


//RUTA VALORES 
routes.use('/value',value);


export default routes;