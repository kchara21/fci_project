import { Plantilla } from "./Plantilla";
import { Piscina } from './Piscina';
import { Valor } from './Valor';
export declare class Parametro {
    id: number;
    plantilla: Plantilla;
    piscina: Piscina;
    codigo: string;
    nombre: string;
    valores: Valor[];
    createdAt: Date;
    updateAt: Date;
}
