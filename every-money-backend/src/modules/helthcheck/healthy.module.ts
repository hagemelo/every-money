import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthyController } from './healthy.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HealthyController]
})
export class HealthyModule {}