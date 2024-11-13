/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ExpensesModule } from './expenses/expenses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ExpensesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username:'postgres',
      password:'postgres@',
      database: 'expenses-management',
      autoLoadEntities:true,
      synchronize: true,
    }),
    AuthModule,
    CategoryModule,
    
  ],
})
export class AppModule {}
