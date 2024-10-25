/* eslint-disable prettier/prettier */

import { IsNotEmpty } from "class-validator";
export class UpdateCategoryDto{

    id: string;
    
    @IsNotEmpty()
    name: string;

   
}