
import { Request, Response } from 'express';
import fetch from 'node-fetch';



export class ApiController{

    static getAll = async(req:Request,res:Response)=>{
        let API = 'https://api-esp8266-bfcd7-default-rtdb.firebaseio.com/Proyecto1.json'; //TODO: poner la API como variable de entorno
        let body;
        try{
            const  response = await fetch(API);
            body = await response.json();
        }catch(e){
            res.status(404).json({message:'Something goes wrong!'})
        }
        (body)
        ?res.json(body)
        :res.status(404).json({message:'Not result'})
    }




    
}