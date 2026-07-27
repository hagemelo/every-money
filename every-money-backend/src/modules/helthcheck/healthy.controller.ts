import { Controller, Get, HttpCode } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { DataSource, getConnection } from 'typeorm';

@Controller('healthy')
export class HealthyController {
  constructor(private readonly health: HealthCheckService,
    private readonly dataSource: DataSource) {}

  @Get('liveness')
  @HealthCheck()
  @HttpCode(200)
  public liveness(): unknown {
    return { message: 'Service up and waiting for respond requests' };
  }

  @Get('readiness')
  @HealthCheck()
  public readiness(): unknown {
    return this.health.check([
      (): Promise<HealthIndicatorResult> => this.checkDatabase(),
    ]);
  }

  private async checkDatabase(): Promise<HealthIndicatorResult> {
   await this.dataSource.query('SELECT 1');
    return {
        database: {
        status: 'up',
        }
    }; 
  }

}
