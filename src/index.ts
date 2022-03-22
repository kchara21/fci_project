import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import path from 'path'
import routes from './routes';


import { Application } from 'express';

class Server {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    //Configurara la propiedad "app"
    this.app.set('port', process.env.PORT || 3000);
    //Middlewares
    this.app.use(cors()); // Obtener permiso para acceder a recursos seleccionados desde un servidor, en un origen distinto (dominio) al que pertenece.


    this.app.use(express.json()); // Para poder recibir datos JSON y entenderlos.
    this.app.use(express.urlencoded({ extended: false })); // Em caso de querer enviar desde un form. HTML
    this.app.use(express.static('public'));
    this.app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'dist/index.js'))
    })
  }

  routes(): void {
    // Definir de app las rutas de mi servidor
    this.app.use('/', routes);
  }

  start(): void {
    // Para que el servidor empiece a escuchar
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server on port`, this.app.get('port'));
    });
  }
}

const server = new Server();
server.start();
