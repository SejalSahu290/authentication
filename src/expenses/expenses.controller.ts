/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from './expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseFilterDto } from './dto/get-expense-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expenses')
@UseGuards(AuthGuard())
export class ExpensesController {
  expenseRepository: any;
  constructor(private expenseService: ExpensesService) {}

  // Get all expenses or filter them if filterDto is provided
  // @Get()
  // async getExpenses(@Query() filterDto: GetExpenseFilterDto, @GetUser() user: User): Promise<Expense[]> {
  //   if (Object.keys(filterDto).length) {
  //   } else {
  //     return await this.expenseService.getAllExpenses();
  //   }
  // }

  @Get()
  async getExpense(@Query() filterDto: GetExpenseFilterDto, @GetUser() user: User) : Promise<Expense[]> {
      return await this.expenseService.getAllExpense(filterDto, user);
  }

  // Get a single expense by its ID
  // @Get('/:id')
  // async getExpenseById(@Param('id') id: number): Promise<Expense> {
  //   return await this.expenseService.getExpenseById(id);
  // }

  @Get('/:id')
  getExpenseById(@Param('id') id: number, @GetUser() user: User): Promise<Expense>{
      return this.expenseService.getExpenseById(id, user);
  }

  // Create a new expense
  @Post()
  async createExpense(@Body() createExpenseDto: CreateExpenseDto,
    @GetUser() user: User,
): Promise<Expense> {
    return await this.expenseService.createExpense(createExpenseDto, user);
  }

  // Delete an expense by its ID
  // @Delete('/:id')
  // async deleteExpense(@Param('id') id: number): Promise<void> {
  //   return await this.expenseService.deleteExpense(id);
  // }

  @Delete('/:id')
    async deleteExpense(@Param('id') id: string): Promise<void>{
        return await this.expenseService.delete(id);
    }

  @Patch()
  async updateTask(
      @Body() updateExpenseDto: UpdateExpenseDto,
      @GetUser() user: User
  ): Promise<Expense>{
     
      return this.expenseService.updateExpense(updateExpenseDto, user);
  }

 
}


 


