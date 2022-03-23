import 'reflect-metadata';
import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes';
import helmet from 'helmet';
import {createConnection} from "typeorm";

createConnection().then(async connection=>{
    console.log('DB Connected');
}).catch(err=>console.log(err));

class Server{
    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{ //Configurara la propiedad "app"
        this.app.set('port', process.env.PORT || 3000);
       
        //Middlewares
        this.app.use(cors({credentials: true})); // Obtener permiso para acceder a recursos seleccionados desde un servidor, en un origen distinto (dominio) al que pertenece.
        this.app.use(helmet());
        
        this.app.use(express.json()); // Para poder recibir datos JSON y entenderlos.
        this.app.use(express.urlencoded({extended:false})); // Em caso de querer enviar desde un form. HTML

        this.app.use(function (req, res, next) {
            res.setHeader(
              'Content-Security-Policy-Report-Only',
              "default-src 'self' 'unsafe-inline' 'strict-dynamic'; script-src-elem 'self' 'strict-dynamic' https://kit.fontawesome.com/4b9ba14b0f.js https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js; img-src 'self' 'strict-dynamic' https://1.bp.blogspot.com/-gxsOcYWghHA/Xp_izTh4sFI/AAAAAAAAU8s/y637Fwg99qAuzW9na_NT_uApny8Vce95gCEwYBhgL/s1600/header-footer-gradient-bg.png "
            );
            next();
          });
    }


    routes(): void{ // Definir de app las rutas de mi servidor
         this.app.use('/',routes);
         this.app.use(express.static('public'));
    }

    start(): void{ // Para que el servidor empiece a escuchar
        this.app.listen(this.app.get('port'), ()=>{
            console.log(`Server on port`, this.app.get('port'));
        });
    }


}

const server = new Server();
server.start();
