
import { Controller, Sse, Query, MessageEvent } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FinancialAssistantService } from '@application/ai/services/financial-assitant.service';

@Controller('ai')
export class FinancialAssistantController {
  constructor(private readonly financialAssistantService: FinancialAssistantService) {}

  @Sse('chat-stream')
  async chatStream(@Query('prompt') prompt: string): Promise<Observable<MessageEvent>> {
    return this.financialAssistantService.streamAgentResponse(prompt || 'Olá, Sou o assistente financeiro da pessoal, como posso ajudar você hoje?');
  }
}