import { validate } from 'class-validator';
import { Request, Response } from 'express';
import {getRepository} from "typeorm";
import { Plantilla } from '../entity/Plantilla';
import { Parametro } from '../entity/Parametro';
import { Piscina } from '../entity/Piscina';


export class TemplateController{

    static getAll = async(req:Request,res:Response)=>{
        const paramRepository = getRepository(Plantilla);
        let params;
        try{
            params = await paramRepository.find({relations:["parametros"]});
        }catch(e){
            res.status(404).json({message:'Something goes wrong!'})
        }
        (params.length>0)
        ?res.json(params)
        :res.status(404).json({message:'Not result'})
    }

    static getById = async(req:Request,res:Response)=>{
        const {id} = req.params;
        const paramRepository = getRepository(Plantilla);
        try{
            const param = await paramRepository.findOneOrFail(id,{relations:["parametros"]});
            res.json(param)
        }
        catch(e){
            res.status(404).json({message:'Not Result'});
        }
    }

    static getTemplateByPool = async (req: Request, res: Response) => {
        const poolRepository = getRepository(Piscina);
        const paramRepository = getRepository(Parametro);
        let piscina;
        const {id} = req.params;

        try {
            
            const parametrosMapped: Parametro[] = [];

            // obtenemos piscina con sus parámetros y usuarios
            piscina = await poolRepository.findOneOrFail(id,{relations: ["parametros", "usuarios"] });
            
                // por cada piscina recorro sus parámetros
                for (let parametro of piscina.parametros) {
                    // obtengo el mismo parámetro de la piscina pero con su relación "plantilla"
                    parametro = await paramRepository.findOne(parametro.id, { relations: ["plantilla"] });
                    // el nuevo parámetro lo agrego a un arreglo de parámetros
                    parametrosMapped.push(parametro.plantilla);
                }
                // construyo un nuevo objeto de piscina con los nuevos parámetros mapeado
                const piscinaMapped = parametrosMapped;
                // lo agrego al arreglo de piscina que daré de respuesta
              
            

            if (piscinaMapped) {
                return res.json(piscinaMapped)
            }
            res.status(404).json({ message: 'Not result' })
        } catch (e) {
            res.status(404).json({ message: 'Something goes wrong!' })
        }
    }

    
    static getByParam = async(req:Request,res:Response)=>{
        const {nombre} = req.params;

        const paramRepository = getRepository(Plantilla);
        let plantillas;

        try{
            plantillas = await paramRepository.find({relations:['parametros'],where:{nombre}})
        }catch(e){
            res.status(404).json({ message: 'Something goes wrong!' })
        }

        (plantillas.length > 0)
        ? res.json(plantillas)
        : res.status(404).json({ message: 'Not result' })

    }


   

    static newParam = async(req:Request,res:Response)=>{
        const {codigo, nombre,valor_maximo,valor_minimo} = req.body;
        const param = new Plantilla();
        

        param.codigo = codigo;
        param.nombre = nombre;
        param.valor_maximo = valor_maximo;
        param.valor_minimo = valor_minimo;
     
    
        

        //Validate
        const validationOpts = {validationError:{target:false,value:false}};
        const errors = await validate(param,validationOpts);
        if(errors.length>0){
            return res.status(400).json(errors);
        }

        const paramRepository = getRepository(Plantilla)
        try{
            await paramRepository.save(param);
        }catch(e){
            return res.status(404).json({message:'¡Esta plantilla ya existe!'}) 
        }


         res.json({message:'¡Plantilla Creada!'})

    }

    static editParam = async(req:Request,res:Response)=>{
        let param;
        const {id} = req.params;
        const {codigo,nombre,valor_maximo,valor_minimo} = req.body;

        const paramRepository = getRepository(Plantilla);

        try{
            param = await paramRepository.findOneOrFail(id);
            param.codigo = codigo;
            param.nombre = nombre;
            param.valor_maximo = valor_maximo;
            param.valor_minimo = valor_minimo;
        }catch(e){
            return res.status(404).json({message:'Parameter not found'})
        }

        const validationOpts = {validationError:{target:false,value:false}};
        const errors = await validate(param,validationOpts);
        if(errors.length>0){
            return res.status(400).json(errors);
        }


        //Try to save user
        try{
            await paramRepository.save(param);
        }catch(e){
            return res.status(409).json({message:'Plantilla existente'})
        }
        res.status(201).json({message:'¡Plantilla Actualizada!'});
 
    }

    static deleteParam = async(req:Request,res:Response)=>{
        const {id} = req.params;
        const paramRepository = getRepository(Plantilla);

        let param:Plantilla;
        try{ param = await paramRepository.findOneOrFail(id)}
        catch(e){res.status(404).json({message:'Parameter not found'})}


        //Remove user
        paramRepository.delete(id);
        res.status(201).json({message:'Parametro eliminado'})
    }
   
}