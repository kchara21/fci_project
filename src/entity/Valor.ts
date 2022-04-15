import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, Double, ManyToOne, Index } from 'typeorm';
import { Parametro } from './Parametro';


@Entity()

export class Valor {

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Parametro, parametro => parametro.valores,{onDelete:'CASCADE'})
    parametro: Parametro;
    
    @Column("decimal",{precision:5,scale:2})
    valor:number;

    @Column()
    estado:string; //Aceptable | Ideal

    @Column()
    responsable:string;


    @Column()
    @CreateDateColumn()
    createdAt:Date; 

   
 

}
