/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './expense.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense , Category]), AuthModule],
  controllers: [ExpensesController],
  providers: [ExpensesService , CategoryService],
})
export class ExpensesModule {}
