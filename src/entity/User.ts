import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { MinLength, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Piscina } from './Piscina';

@Entity()
@Unique(['email']) //Ese es un que SERA UNICO
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Piscina, (piscina) => piscina.usuarios)
  @JoinTable({
    name: 'user_pool',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'pool_id',
    },
  })
  piscinas: Piscina[];

  @Column()
  @MinLength(6)
  nombre: string;

  @Column()
  @MinLength(6)
  @IsEmail()
  email: string;

  @Column()
  @MinLength(6)
  @IsNotEmpty()
  clave: string;

  @Column()
  @IsNotEmpty()
  rol: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updateAt: Date;

  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.clave = bcrypt.hashSync(this.clave, salt);
  }

  checkPassword(clave: string): boolean {
    return bcrypt.compareSync(clave, this.clave);
  }
}
