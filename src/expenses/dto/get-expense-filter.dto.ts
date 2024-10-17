/* eslint-disable prettier/prettier */
import { IsEnum, IsOptional, IsString } from "class-validator";
import { ExpenseStatus } from "../expense.model";

export class GetExpenseFilterDto{

    @IsOptional()
    @IsEnum(ExpenseStatus)
    status?: ExpenseStatus;

    @IsOptional()
    @IsString()
    search?: string;
}