import {Entity, PrimaryGeneratedColumn, Column, Unique,CreateDateColumn,UpdateDateColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { MinLength } from "class-validator";
import { Parametro } from "./Parametro";


@Entity()
@Unique(['codigo'])
export class Plantilla {
    @PrimaryGeneratedColumn()
    id:number;



    @OneToMany(()=>Parametro, parametro => parametro.plantilla)
    parametros: Parametro[];
  

    @Column()
    @MinLength(6)
    codigo:string;

    @Column()
    nombre:string;

  

    @Column()
    valor_maximo:number;

    @Column()
    valor_minimo:number;


    @Column()
    @CreateDateColumn()
    createdAt:Date;

    @Column()
    @UpdateDateColumn()
    updateAt:Date;
}