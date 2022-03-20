import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import { Usuario } from '../entity/User';
import {validate} from 'class-validator'
import { Piscina } from '../entity/Piscina';

export class UserController {

    static getAll = async(req:Request,res:Response)=>{
        const userRepository = getRepository(Usuario);
        let users;
        try{
            users = await userRepository.find({relations:["piscinas"]});
        }catch(e){
            res.status(404).json({message:'Something goes wrong!'});
        }

        (users.length>0) 
        ?res.json(users)
        :res.status(404).json({message:'Not result'});
        
    }

    static getById = async(req:Request,res:Response)=>{
        const {id} = req.params;
        const userRepository = getRepository(Usuario);
        try{
            const user = await userRepository.findOneOrFail(id,{relations:["piscinas"]});
            res.json(user)
        }
        catch(e){
            res.status(404).json({message:'Not Result'});
        }
    }

    static newUser = async(req:Request,res:Response)=>{

        const userRepository = getRepository(Usuario)
        const poolRepository = getRepository(Piscina)



        const {email,nombre,clave,rol,piscinas} = req.body;
        const user = new Usuario();
        let piscinaSupervisor = [];
       

        user.email = email;
        user.nombre = nombre;
        user.clave = clave;
        user.rol = rol;
       

      
        if(user.rol === 'supervisor'){
            const piscinas = await poolRepository.find();

            piscinas.forEach(piscina => {
                piscinaSupervisor.push(piscina);
          
            });
            user.piscinas = piscinaSupervisor
   
            
        }else{
            const piscinasBD = await poolRepository.findByIds(piscinas);
             user.piscinas = piscinasBD;
        }

    
            
       
        try{
           
            user.hashPassword();
            await userRepository.save(user)


        }catch(e){
            return res.status(404).json({message:'Este email ya existe'})
        }

        return res.json({message:'¡Usuario Creado!'});
    }

    static editUser = async(req:Request, res:Response)=>{
        let user;
        const {id} = req.params;
        const {email,nombre,rol,piscinas} = req.body;

        const userRepository = getRepository(Usuario);
        const poolRepository = getRepository(Piscina)

        
       


        //Try get User
        try{
            user = await userRepository.findOneOrFail(id)
            const piscinasBD = await poolRepository.findByIds(piscinas);
            user.email = email;
            user.nombre = nombre;
            user.rol = rol;
            user.piscinas = piscinasBD;
        }catch(e){
            return res.status(404).json({message:'User not found'})
        }

        const validationOpts = {validationError:{target:false,value:false}};
        const errors = await validate(user,validationOpts);
        if(errors.length>0){
            return res.status(400).json(errors);
        }

        //Try to save user
        try{
            await userRepository.save(user);
        }catch(e){
            return res.status(409).json({message:'Este email ya existe'})
        }

        res.status(201).json({message:'Usuario Actualizado'});

    }

    static deleteUser = async(req:Request,res:Response)=>{
        const {id} = req.params;
        const userRepository = getRepository(Usuario);

        let user:Usuario;
        try{ user = await userRepository.findOneOrFail(id)}
        catch(e){res.status(404).json({message:'User not found'})}


        //Remove user
        userRepository.delete(id);
        res.status(201).json({message:'¡Usuario Eliminado!'})
    }

}

export default UserController;