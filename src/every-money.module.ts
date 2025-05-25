import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './infrastructure/database/database.module';
import { RepositoriesModule } from '@infrastructure/repositories/repositories.module';


const useCases = [];


@Module({
  imports: [DatabaseModule, RepositoriesModule],
  controllers: [],
  providers: [...useCases],
})
export class EveryMoneyModule {}
