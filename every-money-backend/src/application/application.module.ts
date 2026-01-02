import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@infrastructure/repositories/repositories.module';
import { FindUserByEmailAndPasswordUseCase } from './use-cases/find-user-by-email-and-password.use-case';
import { AlterUserPasswordUseCase } from './use-cases/alter-user-password.use-case';
import { CreateAccountUseCase } from './use-cases/create-account.use-case';
import { ListAllAccountByUserIdUseCase } from './use-cases/list-all-account-by-user-id.use-case';
import { CreateCategoryUseCase } from './use-cases/create-category.use-case';
import { ListAllCategoriesByUserIdUseCase } from './use-cases/list-all-categories-by-user-id.use-case';
import { CreateBudgetUseCase } from './use-cases/create-budget.use-case';
import { CreateTransactionUseCase } from './use-cases/create-transaction.use-case';
import { FindUserByUseCase } from './use-cases/find-user-by.use-case';
import { ListAllBudgetByUserIdUseCase } from './use-cases/list-all-budget-by-user-id.use-case';

const useCases = [
    AlterUserPasswordUseCase,
    CreateAccountUseCase,
    CreateBudgetUseCase,
    CreateCategoryUseCase,
    CreateTransactionUseCase,
    FindUserByEmailAndPasswordUseCase, 
    FindUserByUseCase,
    ListAllAccountByUserIdUseCase,
    ListAllCategoriesByUserIdUseCase,
    ListAllBudgetByUserIdUseCase,
    ]

@Module({
  imports: [RepositoriesModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class ApplicationModule {}
