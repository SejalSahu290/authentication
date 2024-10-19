/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/user.entity";
import { Exclude } from "class-transformer";

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

 
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 @ManyToOne(_type => User, user=> user.expense, {eager: false})
 @Exclude({toPlainOnly: true})
 user: User;
}