/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from "typeorm";
import { Expense } from "./expense.entity";

@EntityRepository(Expense)
export class ExpensesRepository extends Repository<Expense>{

}