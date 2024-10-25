/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    
    id:number;

    @IsNotEmpty()
    name:string;
}


