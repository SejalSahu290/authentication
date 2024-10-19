/* eslint-disable prettier/prettier */
import { Expense } from 'src/expenses/expense.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Expense, (expense) => expense.user, { eager: true })
  expense: Expense[];
}
