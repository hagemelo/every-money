import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { RepositoriesModule } from '@infrastructure/repositories/repositories.module';
import { ApplicationModule } from '@application/application.module';
import { AuthModule } from './modules/auth/auth.module';
import { AlterUserPasswordController } from './interface/usuario/alter-user-password.controller';
import jwtConfig from './modules/config/jwt.config';
import databaseConfig from './modules/config/database.config';


@Module({
  imports: [DatabaseModule, ApplicationModule, AuthModule, RepositoriesModule, 
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath:  `.env.${process.env.NODE_ENV}` || 'development', 
    load: [jwtConfig, databaseConfig],
  }),],
  controllers: [AlterUserPasswordController],
})
export class EveryMoneyModule {}
