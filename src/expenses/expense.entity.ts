/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ExpenseStatus } from "./expense.model";

@Entity()
export class Expense{
    @PrimaryGeneratedColumn()
     id: number;


 @Column()
 title: string;


@Column()
 description:string;


 @Column()
 amount:number;


 @Column()
 status:ExpenseStatus;
}