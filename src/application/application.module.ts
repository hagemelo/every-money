import { Module } from '@nestjs/common';
import { RepositoriesModule } from '@infrastructure/repositories/repositories.module';
import { FindUserByEmailAndPasswordUseCase } from './use-cases/find-user-by-email-and-password.use-case';


@Module({
  imports: [RepositoriesModule],
  providers: [FindUserByEmailAndPasswordUseCase,],
  exports: [FindUserByEmailAndPasswordUseCase],
})
export class ApplicationModule {}
