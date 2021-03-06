import {getRepository} from 'typeorm';
import {Request,Response} from 'express';
import { Usuario } from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { validate } from 'class-validator';

class AuthController{
    static login = async(req:Request,res:Response)=>{
        const {email,clave} = req.body;

        if(!(email && clave)){
            res.status(400).json({message:'Usuario y Clave requeridos!'});
        }
        const userRepository:any = getRepository(Usuario);
        let user:Usuario;

        try{
            user = await userRepository.findOneOrFail({where:{email}})
        }catch(e){
            return res.status(400).json({message:'Usuario o Clave incorrectos!'})
        }
        //Check password
        if(!user.checkPassword(clave)){
            return res.status(400).json({message:'Usuario o clave incorrecta'})
            
        }

        const token = jwt.sign({userId:user.id,email:user.email},config.jwtSecret,{expiresIn:'2h'});

         res.json({message:'OK',token,userId:user.id,email:user.email,rol:user.rol});
      
        

    };

    static changePassword = async(req:Request,res:Response)=>{
        const {userId} = res.locals.jwtPayload;
        const {oldPassword,newPassword} = req.body;
        
        if(!(oldPassword && newPassword)){
           return res.status(400).json({message:'Clave antigua & Nueva clave son requeridos'});
        }
        
        const userRepository:any  = getRepository(Usuario);
        let user:Usuario;

        try{
            user = await userRepository.findOneOrFail(userId);
        }catch(e){
            res.status(400).json({message:'Algo salió mal!'});
        }

        if(!user.checkPassword(oldPassword)){
            return res.status(401).json({message:'Revisa tu clave antigua...'})
        }

        user.clave = newPassword;
        const validationOps = {validationError:{target:false,value:false}};
        const errors = await validate(user,validationOps)
        
        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        //Hash password
        user.hashPassword()
        userRepository.save(user);
        res.json({message:'Clave Actualizada!'});
    }

   
    
}

export default AuthController;
