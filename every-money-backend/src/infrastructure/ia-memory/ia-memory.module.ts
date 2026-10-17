import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { FINANCIAL_ASSISTANT_MEMORY, financialAssistantMemoryProvider } from "./mastra-memory.provider";

@Module({
    imports: [
      ConfigModule,
    ],
    providers: [
      financialAssistantMemoryProvider,
    ],
    exports: [
      FINANCIAL_ASSISTANT_MEMORY,
    ],
  })
  export class AiMemoryModule {}