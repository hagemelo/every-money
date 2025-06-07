import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { RepositoriesModule } from '@infrastructure/repositories/repositories.module';
import { ApplicationModule } from '@application/application.module';
import { AuthModule } from './modules/auth/auth.module';
import { AlterUserPasswordController } from './interface/usuario/alter-user-password.controller';
import jwtConfig from './modules/config/jwt.config';
import databaseConfig from './modules/config/database.config';

import { AccountController } from './interface/conta/account.controller';
import { CreateCategoryController } from './interface/categoria/category.controller';


@Module({
  imports: [DatabaseModule, ApplicationModule, AuthModule, RepositoriesModule, 
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath:  `.env.${process.env.NODE_ENV}`, 
    load: [jwtConfig, databaseConfig],
  }),],
  controllers: [AlterUserPasswordController, AccountController, CreateCategoryController],
})
export class EveryMoneyModule {}
