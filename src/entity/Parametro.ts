import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany, Between } from 'typeorm';
import { MinLength } from "class-validator";
import { Plantilla } from "./Plantilla";
import { Piscina } from './Piscina';
import { Valor } from './Valor';

@Entity()
export class Parametro {
    @PrimaryGeneratedColumn()
    id:number;



   @ManyToOne(()=>Plantilla,plantilla=>plantilla.parametros)
   plantilla:Plantilla;

   @ManyToOne(()=>Piscina,piscina=>piscina.parametros,{onDelete:'CASCADE'})
   piscina:Piscina;
  
  

    @Column()
    @MinLength(6)
    codigo:string;

    @Column()
    @MinLength(2)
    nombre:string;

    @OneToMany(() => Valor, valor => valor.parametro)
    valores: Valor[];


    @Column()
    @CreateDateColumn()
    createdAt:Date;

    @Column()
    @UpdateDateColumn()
    updateAt:Date;
}