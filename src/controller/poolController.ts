import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { Piscina } from '../entity/Piscina';
import { getRepository } from 'typeorm';
import { Parametro } from '../entity/Parametro';


export class PoolController {

    static getAll = async (req: Request, res: Response) => {
        const poolRepository = getRepository(Piscina);
        const paramRepository = getRepository(Parametro);
        let piscinas: Piscina[];

        try {
            const piscinasMapped: Piscina[] = [];
            const parametrosMapped: Parametro[] = [];

            // obtenemos piscina con sus parámetros y usuarios
            piscinas = await poolRepository.find({ relations: ["parametros", "usuarios"] });
            

            // ! hace un rato no funcionaba porque estábamos usando programación funcional (forEach, map, etc)
            // y la programación funcional se comporta distinto a la imperativa (for, etc)
            // dado que las promesas se comportan de una forma con programación funcional y de otra forma con la imperativa
            // con la imperativa va paso a paso y si espera
            // con la funcional aún no sabemos exactamente por qué pero enviaba la respuesta antes de obtener los parámetros mapeados, 
            // por lo que enviaba los parámetros vacíos 
            for (const piscina of piscinas) {
                // por cada piscina recorro sus parámetros
                for (let parametro of piscina.parametros) {
                    // obtengo el mismo parámetro de la piscina pero con su relación "plantilla"
                    parametro = await paramRepository.findOne(parametro.id, { relations: ["plantilla"] });
                    // el nuevo parámetro lo agrego a un arreglo de parámetros
                    parametrosMapped.push(parametro);
                }
                // construyo un nuevo objeto de piscina con los nuevos parámetros mapeado
                const piscinaMapped = {
                    ...piscina,
                    parametros: parametrosMapped
                };
                // lo agrego al arreglo de piscinas que daré de respuesta
                piscinasMapped.push(piscinaMapped)
            }

            if (piscinasMapped.length > 0) {
                return res.json(piscinasMapped)
            }
            res.status(404).json({ message: 'Not result' })
        } catch (e) {
            res.status(404).json({ message: 'Something goes wrong!' })
        }
    }

    
    static getById = async (req: Request, res: Response) => {
        const poolRepository = getRepository(Piscina);
        const paramRepository = getRepository(Parametro);
        let piscina:Piscina;
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
                    parametrosMapped.push(parametro);
                }
                // construyo un nuevo objeto de piscina con los nuevos parámetros mapeado
                const piscinaMapped = {
                    ...piscina,
                    parametros: parametrosMapped
                };
                // lo agrego al arreglo de piscina que daré de respuesta
              
            

            if (piscinaMapped) {
                return res.json(piscinaMapped)
            }
            res.status(404).json({ message: 'Not result' })
        } catch (e) {
            res.status(404).json({ message: 'Something goes wrong!' })
        }
    }



    static newPool = async (req: Request, res: Response) => {
        const { codigo, camaronera, responsable } = req.body;
        const pool = new Piscina;

        pool.codigo = codigo;
        pool.camaronera = camaronera;
        pool.responsable = responsable;



        //Validate
        const validationOpts = { validationError: { target: false, value: false } };
        const errors = await validate(pool, validationOpts);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const poolRepository = getRepository(Piscina);
        try {
            await poolRepository.save(pool);
        } catch (e) {
            return res.status(404).json({ message: 'Pool already exist' })
        }

        res.json('Piscina Creada!')

    }


    static editPool = async (req: Request, res: Response) => {
        let pool;
        const { id } = req.params;
        const { codigo, componente, camaronera, responsable } = req.body;

        const poolRepository = getRepository(Piscina);
        try {
            pool = await poolRepository.findOneOrFail(id);
            pool.codigo = codigo;
            pool.componente = componente;
            pool.camaronera = camaronera;
            pool.responsable = responsable;
        } catch (e) {
            return res.status(404).json({ message: 'Parameter not found' })
        }

        const validationOpts = { validationError: { target: false, value: false } };
        const errors = await validate(pool, validationOpts);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        //Try to save user
        try {
            await poolRepository.save(pool);
        } catch (e) {
            return res.status(409).json({ message: '¡Piscina existente!' })
        }
        res.status(201).json({ message: 'Piscina Actualizada' });

    }

    static deletePool = async (req: Request, res: Response) => {
        const { id } = req.params;
        const poolRepository = getRepository(Piscina);

        let pool: Piscina;
        try { pool = await poolRepository.findOneOrFail(id) }
        catch (e) { res.status(404).json({ message: 'Pool not found' }) }

        //Remove user
        poolRepository.delete(id);
        res.status(201).json({ message: '¡Piscina Eliminada!' })
    }

}
