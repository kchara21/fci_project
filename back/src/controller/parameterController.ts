import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { Between, getRepository, CreateDateColumn, getManager } from 'typeorm';
import { Parametro } from '../entity/Parametro';
import { Valor } from '../entity/Valor';
import fetch from 'node-fetch';
import { format } from 'date-fns';
import * as moment from 'moment';
import { Usuario } from '../entity/User';



export class ParamController {


    static censusParameter = async (req: Request, res: Response) => {

        const paramRepository = getRepository(Parametro);
        const valueRepository = getRepository(Valor);
        const userRepository = getRepository(Usuario);

        let valoresApi: [] = [];
        let API = 'https://api-esp8266-bfcd7-default-rtdb.firebaseio.com/Proyecto1.json'; //TODO: poner la API como variable de entorno
        let body;
        let responsable;

        const { id, responsableId } = req.params;

       
        try {
            const response = await fetch(API);
            body = await response.json();
            valoresApi = body;
        } catch (e) {
            res.status(404).json({ message: 'Something goes wrong!' })
        }



        try{
            const usuario = await userRepository.findOneOrFail(responsableId);
            responsable = usuario.nombre;
        }catch(e){
            res.status(404).json({message:'Not Result'});
        }

        try {
            const parametros = await paramRepository
                .createQueryBuilder("param")
                .where("param.piscina.id = :id", { id })
                .getMany();

            if (parametros.length < 1) {
                return res.json({ message: "Piscina sin parametros asignados" })
            }

            for (let parametro of parametros) {
                parametro = await paramRepository.findOne(parametro.id, { relations: ["valores", "plantilla"] })


                let nombreApi = Object.keys(valoresApi)
                let valorApi = Object.values(valoresApi);


                for (let i = 0; i <= nombreApi.length; i++) {
                    if (parametro.nombre === nombreApi[i]) {
                        const value = new Valor();
                        value.valor = valorApi[i];
                        value.responsable = responsable;
                        if (valorApi[i] >= parametro.plantilla.valor_minimo && valorApi[i] <= parametro.plantilla.valor_maximo) {
                            value.estado = "aceptable";
                        } else {
                            value.estado = "revisar";
                        }

                        value.parametro = parametro;

                        await valueRepository.save(value);

                    }
                }

            }

            res.json({ message: "Valores guardados!" })

        } catch (e) {
            res.status(404).json({ message: 'Not Result' });
        }

    }


    static getAll = async (req: Request, res: Response) => {
        const poolRepository = getRepository(Parametro);
        let parameters;
        try {
            parameters = await poolRepository.find({ relations: ["plantilla", "piscina", "valores"] });
        } catch (e) {
            res.status(404).json({ message: 'Something goes wrong!' })
        }
        (parameters.length > 0)
            ? res.json(parameters)
            : res.status(404).json({ message: 'Not result' })
    }


    static getByPool = async (req: Request, res: Response) => {
        const { piscina } = req.params;
        let parameters;
        let paramsByPool = [];
        const poolRepository = getRepository(Parametro);
        try {
            parameters = await poolRepository.find({ relations: ["plantilla", "piscina", "valores"] });
            for (let param of parameters) {
                console.log(param.piscina.codigo);
                console.log(piscina);
                if (param.piscina.codigo === piscina) {
                    paramsByPool.push(param);
                }
            }

        } catch (e) {
            res.status(404).json({ message: 'Something goes wrong!' })
        }

      

        (paramsByPool.length > 0)
            ? res.json(paramsByPool)
            : res.status(404).json({ message: 'No se encontraron parametros' })

    }


    static newParam = async (req: Request, res: Response) => {
        const { codigo, nombre, plantilla, piscina } = req.body;
        const param = new Parametro;

        param.codigo = codigo;
        param.nombre = nombre;
        param.plantilla = plantilla;
        param.piscina = piscina;




        //Validate
        const validationOpts = { validationError: { target: false, value: false } };
        const errors = await validate(param, validationOpts);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const poolRepository = getRepository(Parametro);
        try {

            //Validate if exist a param with the same pool
            const paramExist = await poolRepository.find({ where: { piscina: piscina, nombre: nombre } })
            if (paramExist.length > 0) {

                return res.json({ message: `Parametro existente en la piscina seleccionada` })
            }

            await poolRepository.save(param);
        } catch (e) {
            return res.status(404).json({ message: 'Parameter already exist' })
        }

        res.json('Parametro Creado!')

    }




    static editParam = async (req: Request, res: Response) => {
        let param;
        const { id } = req.params;
        const { codigo, nombre, plantilla, piscina } = req.body;

        const paramRepository = getRepository(Parametro);


        const poolRepository = getRepository(Parametro);

        try {
            param = await paramRepository.findOneOrFail(id);
            param.codigo = codigo;
            param.nombre = nombre;
            param.plantilla = plantilla;
            param.piscina = piscina;



        } catch (e) {
            return res.status(404).json({ message: 'Parameter not found' })
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
        const paramRepository = getRepository(Parametro);

        let param: Parametro;
        try { param = await paramRepository.findOneOrFail(id) }
        catch (e) { res.status(404).json({ message: 'Parameter not found' }) }


        //Remove user
        paramRepository.delete(id);
        res.status(201).json({ message: '¡Parametro eliminado!' })
    }



}