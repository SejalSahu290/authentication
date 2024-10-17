/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
export class CreateExpenseDto{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    amount:number;
}