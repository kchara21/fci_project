import { format } from "date-fns";
import { Request, Response } from "express";
import { Between, getRepository } from "typeorm";
import { Parametro } from "../entity/Parametro";
import { Valor } from "../entity/Valor";


export class ValueController {

    static getByDate = async (req: Request, res: Response) => {

        const valueRepository = getRepository(Valor);
        const paramRepository = getRepository(Parametro);
        const { pool, parameter, start, end } = req.params;

        let valuesParam: Valor[];
        let valParPool: Valor[] = [];

        const BetweenDates = (from: Date | string, to: Date | string) =>
            Between(
                format(typeof from === 'string' ? new Date(from) : from, 'yyyy-MM-dd'),
                format(typeof to === 'string' ? new Date(to) : to, 'yyyy-MM-dd'),
            );

        try {
            valuesParam = await valueRepository.find({ relations: ["parametro"], where: { createdAt: BetweenDates(start, end) } })
        } catch (e) {
            res.status(404).json({ message: 'Something goes wrong!' })
        }


        for (let value of valuesParam) {
           
                value.parametro = await paramRepository.findOneOrFail(value.parametro.id, { relations: ["piscina", "plantilla"] })

                if ((value.parametro.piscina.id) === Number(pool) && parameter === 'TODOS') {
                    valParPool.push(value);
                }else if((value.parametro.piscina.id) === Number(pool) && parameter === value.parametro.nombre){
                    valParPool.push(value);
                }
        }



        (valParPool.length > 0)
            ? res.json({ valParPool })
            : res.json({ message: 'No se encontraron valores' })

    }

    static reportByPool = async(req:Request,res:Response)=>{
        const valueRepository = getRepository(Valor);
        const paramRepository = getRepository(Parametro);
        const { pool} = req.params;

        let valuesParam: Valor[];
        let valParPool: Valor[] = [];

        try {
            valuesParam = await valueRepository.find({ relations: ["parametro"]})
        } catch (e) {
            res.status(404).json({ message: 'Something goes wrong!' })
        }




        for (let value of valuesParam) {       
                value.parametro = await paramRepository.findOneOrFail(value.parametro.id, { relations: ["piscina", "plantilla"]})
                if ((value.parametro.piscina.id) === Number(pool)) {
                    valParPool.push(value);
                }




        }


        (valParPool.length > 0)
            ? res.json({ valParPool })
            : res.json({ message: 'No se encontraron valores' })

            
    }


}

export default ValueController;