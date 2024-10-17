/* eslint-disable prettier/prettier */
// import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
// import { ExpensesService } from './expenses.service';
// import {Expense} from './expense.entity'
// import { CreateExpenseDto } from './dto/create-expense.dto';
// import { GetExpenseFilterDto } from './dto/get-expense-filter.dto';
// import { UpdateExpenseStatusDto } from './dto/update-expense-status.dto';

// @Controller('expenses')
// export class ExpensesController {
//   constructor(private expenseService: ExpensesService) {}

 
//   @Get()
//   async getExpenses(@Query() filterDto: GetExpenseFilterDto): Promise<Expense[]>{

//   if(Object.keys(filterDto).length){
//     // return this.expenseService.getExpensesWithFilters(filterDto);
//   } else {
//     return await this.expenseService.getAllExpenses();
//   }
    
//   }
   
//    @Get('/:id')
//    getExpenseById(@Param('id')id:number): Expense{
//     return this.expenseService.getExpenseById(id);
//   }

  
//   @Post()
//     createTask(@Body() createExpenseDto : CreateExpenseDto): Promise<Expense>{
//         return this.expenseService.createExpense(createExpenseDto,);
//     }


//   @Delete('/:id')
//   async deleteTask(@Param('id') id: number): Promise<void>{
//       return await this.expenseService.deleteExpense(id);
//   }


//   @Patch('/:id/status')
//   async updateTask(
//       @Param('id') id: string,
//       @Body() updateExpenseStatusDto: UpdateExpenseStatusDto,
//   ): Promise<Expense>{
//       const {status} = updateExpenseStatusDto;
//       return this.expenseService.updateExpenseStatus(id, status);
//   }

// }




/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from './expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseFilterDto } from './dto/get-expense-filter.dto';
import { UpdateExpenseStatusDto } from './dto/update-expense-status.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private expenseService: ExpensesService) {}

  // Get all expenses or filter them if filterDto is provided
  @Get()
  async getExpenses(@Query() filterDto: GetExpenseFilterDto): Promise<Expense[]> {
    if (Object.keys(filterDto).length) {
      // You can implement this method in the service
      // return this.expenseService.getExpensesWithFilters(filterDto);
      return []; // Placeholder until the service is implemented
    } else {
      return await this.expenseService.getAllExpenses();
    }
  }

  // Get a single expense by its ID
  @Get('/:id')
  async getExpenseById(@Param('id') id: number): Promise<Expense> {
    return await this.expenseService.getExpenseById(id);
  }

  // Create a new expense
  @Post()
  async createExpense(@Body() createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return await this.expenseService.createExpense(createExpenseDto);
  }

  // Delete an expense by its ID
  @Delete('/:id')
  async deleteExpense(@Param('id') id: number): Promise<void> {
    return await this.expenseService.deleteExpense(id);
  }

  // Update an expense's status by its ID
  @Patch('/:id/status')
  async updateExpenseStatus(
    @Param('id') id: number,
    @Body() updateExpenseStatusDto: UpdateExpenseStatusDto,
  ): Promise<Expense> {
    const { status } = updateExpenseStatusDto;
    return await this.expenseService.updateExpenseStatus(id, status);
  }
}

