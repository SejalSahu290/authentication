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
