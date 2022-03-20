import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { MinLength } from "class-validator";

import { Parametro } from './Parametro';
import { Usuario } from './User';


@Entity()
@Unique(['codigo'])
export class Piscina{

    @PrimaryGeneratedColumn()
    id:number;

 
    
    @ManyToMany(()=>Usuario, (usuario)=>usuario.piscinas,{onDelete:'CASCADE'})
    usuarios:Usuario[];

    @OneToMany(()=>Parametro,parametro=>parametro.piscina)
    parametros:Parametro[];

  
    @Column()
    @MinLength(4)
    camaronera:string;

    @Column()
    @MinLength(4)
    responsable:string;


    @Column({type:'varchar'})
    @MinLength(6)
    codigo:string;

   

}