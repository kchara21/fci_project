import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as cors from 'cors';
import routes from './routes';
import helmet from "helmet";


createConnection().then(async () => {
    let PORT = process.env.PORT || 3000;

    // create express app
    const app = express();

    //Middelwares
    app.use(cors({credentials: true}));
    app.use(express.json());
    app.use(express.static('public'))
    app.use(express.urlencoded({extended:false})); // Em caso de querer enviar desde un form. HTML
    require('dotenv').config();

 

    //Routes
    app.use('/',routes);

    // start express server
    app.listen(PORT,()=> console.log(`Server running on PORT ${PORT}`));


}).catch(error => console.log(error));
