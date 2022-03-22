import { Piscina } from './Piscina';
export declare class Usuario {
    id: number;
    piscinas: Piscina[];
    nombre: string;
    email: string;
    clave: string;
    rol: string;
    createdAt: Date;
    updateAt: Date;
    hashPassword(): void;
    checkPassword(clave: string): boolean;
}
