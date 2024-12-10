/* eslint-disable prettier/prettier */
import { Expense } from "src/expenses/expense.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @OneToMany(() => Expense, (expense) => expense.category, { eager: false })
    expenses: Expense[];


}
