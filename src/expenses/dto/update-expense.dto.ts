/* eslint-disable prettier/prettier */



import { IsNotEmpty } from "class-validator";
export class UpdateExpenseDto{

    @IsNotEmpty()
    id: string;
    
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    amount:number;
}