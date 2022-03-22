import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import path from 'path'
import routes from './routes';
import {createConnection} from "typeorm";


const PORT = process.env.PORT || 3000;

createConnection().then(async () => {

    // create express app
    const app = express();

    //Middelwares
    app.use(cors());
    app.use(express.json());
    app.use(express.static('public'));

    //Routes
    app.use('/',routes);

    app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'public/index.html') )
    })


    // start express server
    app.listen(PORT,()=> console.log(`Server running on PORT ${PORT}`));


}).catch(error => console.log(error));
