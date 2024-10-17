/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import { ExpensesController } from './expenses/expenses.controller';
// import { ExpensesService } from './expenses/expenses.service';
import { ExpensesModule } from './expenses/expenses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

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
  
  ],
  // controllers: [ExpensesController],
  // providers: [ExpensesService],
})
export class AppModule {}
