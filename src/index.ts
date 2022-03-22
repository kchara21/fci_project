import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import helmet from 'helmet';
import {createConnection} from "typeorm";

import { Application } from 'express';

const PORT = process.env.PORT || 3000;

createConnection().then(async () => {

    // create express app
    const app = express();

    //Middelwares
    app.use(cors());
    app.use(express.json());
    app.use(express.static('public'));

    app.use(function (req, res, next) {
      res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'; script-src-attr 'self'"
      );
      next();
    });


    //Routes
    app.use('/',routes);

    // start express server
    app.listen(PORT,()=> console.log(`Server running on PORT ${PORT}`));


}).catch(error => console.log(error));
