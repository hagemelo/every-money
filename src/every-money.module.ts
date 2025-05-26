import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { RepositoriesModule } from '@infrastructure/repositories/repositories.module';
import { ApplicationModule } from '@application/application.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [DatabaseModule, ApplicationModule, AuthModule, RepositoriesModule, ConfigModule.forRoot({
    isGlobal: true, // makes ConfigService available globally
    envFilePath:  `.env.${process.env.NODE_ENV}` || '.env', // default is '.env'
  }),],
  controllers: [],
})
export class EveryMoneyModule {}
