/* eslint-disable prettier/prettier */
import { IsEnum } from "class-validator";
import { ExpenseStatus } from "../expense.model";

export class UpdateExpenseStatusDto{
    @IsEnum(ExpenseStatus)
   status: ExpenseStatus;
}