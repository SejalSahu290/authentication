/* eslint-disable prettier/prettier */

import {  Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { Expense } from './expense.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { GetExpenseFilterDto } from './dto/get-expense-filter.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  async getAllExpense(filterDto : GetExpenseFilterDto, user: User): Promise<Expense[]>{

    const { search} = filterDto;
    const query = this.expenseRepository.createQueryBuilder('expense');
      
    query.where({ user });

    if(search){
        query.andWhere('(LOWER(expense.title) LIKE LOWER(:search) OR LOWER(expense.description) LIKE LOWER(:search))',
          { search : `%${search}%`},
        );
    }

    const expense = await query.getMany();
    return expense;
  }



async getExpenseById(id: number, user: User): Promise<Expense>{
    const found = await this.expenseRepository.findOne({ where:{id, user}})
    if(!found){
      throw new NotFoundException(`Expense with id "${id}" not found`);
    }

    return found;
  }

  // Create a new expense
  async createExpense(
    createExpenseDto: CreateExpenseDto,
    user: User,
  ): Promise<Expense> {
    const { title, description, amount } = createExpenseDto;

    const expense = this.expenseRepository.create({
      title,
      description,
      amount,
      user,
    });

    await this.expenseRepository.save(expense);
    return expense;
  }



async delete(id: string): Promise<void> {

    //await this.expenseRepository.remove();

    const result = await this.expenseRepository.delete(id);

    if(result.affected === 0){
      throw new NotFoundException(`Expense with Id "${id}" not found`)
    }
  }


async updateExpense(updateExpenseDto: UpdateExpenseDto , user): Promise<Expense>{


  const { title , description , amount} = updateExpenseDto;
    
    const expense =  await this.getExpenseById(+updateExpenseDto.id, user);

    
    expense.title = title;
    expense.description = description;
    expense.amount = amount;
     

    await this.expenseRepository.save(expense);

    return expense;
  }


}
