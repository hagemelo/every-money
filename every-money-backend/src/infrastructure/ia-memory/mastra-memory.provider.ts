// src/infrastructure/database/mastra-memory.provider.ts
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Memory } from '@mastra/memory';
import { PostgresStore } from '@mastra/pg';

export const FINANCIAL_ASSISTANT_MEMORY = Symbol(
  'FINANCIAL_ASSISTANT_MEMORY',
);

export const financialAssistantMemoryProvider: Provider = {
  provide: FINANCIAL_ASSISTANT_MEMORY,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const storage = new PostgresStore({
      id: 'financial-assistant-storage',
      host: configService.get<string>('database.host'),
      port: Number(configService.get<string>('database.port')),
      database: configService.get<string>('database.database'),
      user: configService.get<string>('database.username'),
      password: configService.get<string>('database.password'),
      schemaName: 'public',
    });

    return new Memory({
      storage,
      options: {
        lastMessages: 20,
      },
    });
  },
};