import { NestFactory } from '@nestjs/core';
import { EveryMoneyModule } from './every-money.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { VersioningType } from '@nestjs/common';  
import { LoggingInterceptor } from './modules/access-log/logging.interceptor';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(EveryMoneyModule);
  app.enableCors({
    credentials: true,
    methods: ['GET', 'POST'],
    origin: ['http://localhost:8080'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalInterceptors(new LoggingInterceptor())
  await app.listen(3000);
}
bootstrap();
