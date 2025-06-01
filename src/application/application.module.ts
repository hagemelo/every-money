import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@infrastructure/repositories/repositories.module';
import { FindUserByEmailAndPasswordUseCase } from './use-cases/find-user-by-email-and-password.use-case';
import { AlterUserPasswordUseCase } from './use-cases/alter-user-password.use-case';
import { CreateAccountUseCase } from './use-cases/create-account.use-case';
import { ListAllAccountByUserIdUseCase } from './use-cases/list-all-account-by-user-id.use-case';

@Module({
  imports: [RepositoriesModule],
  providers: [FindUserByEmailAndPasswordUseCase, 
    AlterUserPasswordUseCase,
    CreateAccountUseCase,
    ListAllAccountByUserIdUseCase],
  exports: [FindUserByEmailAndPasswordUseCase, 
    AlterUserPasswordUseCase,
    CreateAccountUseCase,
    ListAllAccountByUserIdUseCase],
})
export class ApplicationModule {}
