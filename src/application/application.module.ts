import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@infrastructure/repositories/repositories.module';
import { FindUserByEmailAndPasswordUseCase } from './use-cases/find-user-by-email-and-password.use-case';
import { AlterUserPasswordUseCase } from './use-cases/alter-user-password.use-case';


@Module({
  imports: [RepositoriesModule],
  providers: [FindUserByEmailAndPasswordUseCase, AlterUserPasswordUseCase],
  exports: [FindUserByEmailAndPasswordUseCase, AlterUserPasswordUseCase],
})
export class ApplicationModule {}
