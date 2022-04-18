import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Plantilla } from '../entity/Plantilla';
import { Parametro } from '../entity/Parametro';
import { Piscina } from '../entity/Piscina';


export class TemplateController{

    static getAll = async(req:Request,res:Response)=>{
        const paramRepository:Repository<Plantilla> = getRepository(Plantilla);
        let params:Plantilla[];
        try{
            params = await paramRepository.find({relations:["parametros"]});
        }catch(e){
            res.status(404).json({message:'Algo salió mal!'})
        }
        (params.length>0)
        ?res.json(params)
        :res.status(404).json({message:'No hay resultados'})
    }

    static getById = async(req:Request,res:Response)=>{
        const {id} = req.params;
        const paramRepository:Repository<Plantilla> = getRepository(Plantilla);
        try{
            const param:Plantilla = await paramRepository.findOneOrFail(id,{relations:["parametros"]});
            res.json(param)
        }
        catch(e){
            res.status(404).json({message:'No hay resultados'});
        }
    }

    static getTemplateByPool = async (req: Request, res: Response) => {
        const poolRepository:Repository<Piscina> = getRepository(Piscina);
        const paramRepository:Repository<Parametro> = getRepository(Parametro);
        let piscina:Piscina;
        const {id} = req.params;

        try {
            
            const parametrosMapped: Plantilla[] = [];

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
                const piscinaMapped:Plantilla[] = parametrosMapped;
                // lo agrego al arreglo de piscina que daré de respuesta
              
            

            if (piscinaMapped) {
                return res.json(piscinaMapped)
            }
            res.status(404).json({ message: 'No hay resultados' })
        } catch (e) {
            res.status(404).json({ message: 'Algo salió mal' })
        }
    }

    
    static getByParam = async(req:Request,res:Response)=>{
        const {nombre} = req.params;

        const paramRepository:Repository<Plantilla> = getRepository(Plantilla);
        let plantillas:Plantilla[];

        try{
            plantillas = await paramRepository.find({relations:['parametros'],where:{nombre}})
        }catch(e){
            res.status(404).json({ message: 'Algo salió mal' })
        }

        (plantillas.length > 0)
        ? res.json(plantillas)
        : res.status(404).json({ message: 'No hay resultados' })

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

        const paramRepository:Repository<Plantilla> = getRepository(Plantilla)
        try{
            await paramRepository.save(param);
        }catch(e){
            return res.status(404).json({message:'¡Esta plantilla ya existe!'}) 
        }


         res.json({message:'¡Plantilla Creada!'})

    }

    static editParam = async(req:Request,res:Response)=>{
        let param:Plantilla;
        const {id} = req.params;
        const {codigo,nombre,valor_maximo,valor_minimo} = req.body;

        const paramRepository:Repository<Plantilla> = getRepository(Plantilla);

        try{
            param = await paramRepository.findOneOrFail(id);
            param.codigo = codigo;
            param.nombre = nombre;
            param.valor_maximo = valor_maximo;
            param.valor_minimo = valor_minimo;
        }catch(e){
            return res.status(404).json({message:'Plantilla no funciona'})
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
        const paramRepository:Repository<Plantilla> = getRepository(Plantilla);

        let param:Plantilla;
        try{ param = await paramRepository.findOneOrFail(id)}
        catch(e){res.status(404).json({message:'Parametro no funciona'})}


        //Remove user
        paramRepository.delete(id);
        res.status(201).json({message:'Parametro eliminado'})
    }
   
}