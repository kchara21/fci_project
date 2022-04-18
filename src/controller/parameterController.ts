import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { Between, getRepository, CreateDateColumn, getManager, Repository } from 'typeorm';
import { Parametro } from '../entity/Parametro';
import { Valor } from '../entity/Valor';
import fetch from 'node-fetch';
import moment from 'moment';
import { Usuario } from '../entity/User';



export class ParamController {


    static censusParameter = async (req: Request, res: Response) => {

        const paramRepository:Repository<Parametro> = getRepository(Parametro);
        const valueRepository:Repository<Valor> = getRepository(Valor);
        const userRepository:Repository<Usuario> = getRepository(Usuario);

        let valoresApi:number | string[] = [];
        let API:string = 'https://api-esp8266-bfcd7-default-rtdb.firebaseio.com/Proyecto1.json'; //TODO: poner la API como variable de entorno
        let body:any;
        let responsable:string;

        const { id, responsableId } = req.params;

       
        try {
            const response = await fetch(API);
            body = await response.json();
            valoresApi = body;
        } catch (e) {
            res.status(404).json({ message: 'Algo salió mal!' })
        }



        try{
            const usuario:Usuario = await userRepository.findOneOrFail(responsableId);
            responsable = usuario.nombre;
        }catch(e){
            res.status(404).json({message:'No hay resultado'});
        }

        try {
            const parametros:Parametro[] = await paramRepository
                .createQueryBuilder("param")
                .where("param.piscina.id = :id", { id })
                .getMany();

            if (parametros.length < 1) {
                return res.json({ message: "Piscina sin parametros asignados" })
            }

            for (let parametro of parametros) {
                parametro = await paramRepository.findOne(parametro.id, { relations: ["valores", "plantilla"] })


                let nombreApi:string[] = Object.keys(valoresApi)
                let valorApi:number[] = Object.values(valoresApi);

                for (let i = 0; i <= nombreApi.length; i++) {
                    if (parametro.nombre === nombreApi[i]) {
                        const value:Valor = new Valor();
                        value.createdAt = moment().subtract(5, 'hours').toDate();
                        value.valor = valorApi[i];
                        value.responsable = responsable;
                        if (valorApi[i] >= parametro.plantilla.valor_minimo && valorApi[i] <= parametro.plantilla.valor_maximo) {
                            value.estado = "Aceptable";
                        } else {
                            value.estado = "Revisar";
                        }

                        value.parametro = parametro;

                        await valueRepository.save(value);

                    }
                }



            }

            res.json({ message: "Valores guardados!" })

        } catch (e) {
            res.status(404).json({ message: 'No hay resultados' });
        }

    }


    static getAll = async (req: Request, res: Response) => {
        const poolRepository:Repository<Parametro> = getRepository(Parametro);
        let parameters:Parametro[];
        try {
            parameters = await poolRepository.find({ relations: ["plantilla", "piscina", "valores"] });
        } catch (e) {
            res.status(404).json({ message: 'Algo salió mal!' })
        }
        (parameters.length > 0)
            ? res.json(parameters)
            : res.status(404).json({ message: 'No hay resultados' })
    }


    static getByPool = async (req: Request, res: Response) => {
        const { piscina } = req.params;
        let parameters:Parametro[];
        let paramsByPool = [];
        const poolRepository:Repository<Parametro> = getRepository(Parametro);
        try {
            parameters = await poolRepository.find({ relations: ["plantilla", "piscina", "valores"] });
            for (let param of parameters) {
                if (param.piscina.codigo === piscina) {
                    paramsByPool.push(param);
                }
            }

        } catch (e) {
            res.status(404).json({ message: 'Algo salio mal!' })
        }

      

        (paramsByPool.length > 0)
            ? res.json(paramsByPool)
            : res.status(404).json({ message: 'No se encontraron parametros' })

    }


    static newParam = async (req: Request, res: Response) => {
        const { codigo, nombre, plantilla, piscina } = req.body;
        const param:Parametro = new Parametro;

        param.codigo = codigo;
        param.nombre = nombre;
        param.plantilla = plantilla;
        param.piscina = piscina;


        //Validate
        const validationOpts:any = { validationError: { target: false, value: false } };
        const errors:any = await validate(param, validationOpts);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const poolRepository:Repository<Parametro> = getRepository(Parametro);
        try {

            //Validate if exist a param with the same pool
            const paramExist:Parametro[] = await poolRepository.find({ where: { piscina: piscina, nombre: nombre } })
            if (paramExist.length > 0) {
                return res.json({ message: `Parametro existente en la piscina seleccionada` })
            }

            await poolRepository.save(param);
        } catch (e) {
            return res.status(404).json({ message: 'Parametro existente' })
        }

        res.json('Parametro Creado!')

    }




    static editParam = async (req: Request, res: Response) => {
        let param:Parametro;
        const { id } = req.params;
        const { codigo, nombre, plantilla, piscina } = req.body;

        const paramRepository:Repository<Parametro> = getRepository(Parametro);

        try {
            param = await paramRepository.findOneOrFail(id);
            param.codigo = codigo;
            param.nombre = nombre;
            param.plantilla = plantilla;
            param.piscina = piscina;

        } catch (e) {
            return res.status(404).json({ message: 'Parametro no funciona' })
        }

        const validationOpts = { validationError: { target: false, value: false } };
        const errors = await validate(param, validationOpts);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }


        //Try to save user
        try {
            await paramRepository.save(param);
        } catch (e) {
            return res.status(409).json({ message: '¡Parametro en uso!' })
        }
        res.status(201).json({ message: '¡Parametro actualizado!' });

    }



    static deleteParam = async (req: Request, res: Response) => {
        const { id } = req.params;
        const paramRepository:Repository<Parametro> = getRepository(Parametro);

        let param: Parametro;
        try { param = await paramRepository.findOneOrFail(id) }
        catch (e) { res.status(404).json({ message: 'Parametro no encontrado' }) }


        //Remove user
        paramRepository.delete(id);
        res.status(201).json({ message: '¡Parametro eliminado!' })
    }



}