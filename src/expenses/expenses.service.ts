/* eslint-disable prettier/prettier */

// import { Injectable, NotFoundException } from '@nestjs/common';
// import {  ExpenseStatus } from './expense.model';
// import { CreateExpenseDto } from './dto/create-expense.dto';
// // import { GetExpenseFilterDto } from './dto/get-expense-filter.dto';
// import { Expense } from './expense.entity';
// // import { ExpensesRepository } from './expenses.repository';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';

// @Injectable()
// export class ExpensesService {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     updateExpenseStatus(id: string, status: ExpenseStatus): Expense {
//       throw new Error('Method not implemented.');
//     }

//     constructor(  
//         @InjectRepository(Expense)
//         private expenseRespository: Repository<Expense>){}
//     private expenses: Expense[] = [];


//     async getAllExpenses(): Promise<Expense[]> {
//      return  await this.expenseRespository.find()
//     }

    
//     getExpenseById(id:number): Expense {

//         const found = this.expenses.find((expense) => expense.id === id);

//         if(!found){
//         throw new NotFoundException('Expense With Id "${id}" not found');
//         }

//         return found;
//     }

//    async createExpense(createExpenseDto: CreateExpenseDto): Promise<Expense> {
//         const {title , description } = createExpenseDto;

//         const expense = this.expenseRespository.create({
//             title,
//             description,
//             amount:0,
//             status : ExpenseStatus.OPEN,

//         });
  
//         await this.expenseRespository.save(expense);
//         return expense;
//     }

//    async  deleteExpense(id:number): Promise<void>{
//         const found = this.getExpenseById(id);
//      this.expenses = this.expenses.filter((expense) => expense.id !== found.id);
//     }

//     updateExpense(id:number, status:ExpenseStatus){
//         const expense = this.getExpenseById(id);
//         expense.status = status;
//         return expense;
//     }

// }


// getAllExpenses()
// a method named getAllExpenses inside the ExpensesService class (it means to retrive all expenses stored in the expenses array. )

// :Expense[] (Return type)
// Expense[] means that the method will return an array of expense objects

// return this.expenses (Return Statement)

// return the current value of the expenses array.
// this.expenses refers to the expenses property defined in the class , which holds the array of all expense object . 



/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { ExpenseStatus } from './expense.model';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './expense.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExpensesService {

    constructor(  
        @InjectRepository(Expense)
        private expenseRepository: Repository<Expense>){}
    
    // Get all expenses from the database
    async getAllExpenses(): Promise<Expense[]> {
        return await this.expenseRepository.find();
    }

    // Get a single expense by ID
    async getExpenseById(id: number): Promise<Expense> {
        const found = await this.expenseRepository.findOne({ where: { id } });

        if (!found) {
            throw new NotFoundException(`Expense with ID "${id}" not found`);
        }

        return found;
    }

    // Create a new expense
    async createExpense(createExpenseDto: CreateExpenseDto): Promise<Expense> {
        const { title, description,amount } = createExpenseDto;

        const expense = this.expenseRepository.create({
            title,
            description,
            amount,
            status: ExpenseStatus.OPEN,
        });
  
        await this.expenseRepository.save(expense);
        return expense;
    }

    // Delete an expense by ID
    async deleteExpense(id: number): Promise<void> {
        const result = await this.expenseRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Expense with ID "${id}" not found`);
        }
    }

    // Update an expense's status
    async updateExpenseStatus(id: number, status: ExpenseStatus): Promise<Expense> {
        const expense = await this.getExpenseById(id);
        expense.status = status;

        await this.expenseRepository.save(expense);
        return expense;
    }
}
