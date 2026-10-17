
import {
  Controller,
  Sse,
  Query,
  MessageEvent,
  Req,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { FinancialAssistantService } from '@application/ai/services/financial-assitant.service';

type AuthenticatedRequest = Request & {
  user: {
    id: number;
  };
};

@Controller('ai')
export class FinancialAssistantController {
  constructor(private readonly financialAssistantService: FinancialAssistantService) {}

  @UseGuards(AuthGuard('jwt'))
  @Sse('chat-stream')
  async chatStream(
    @Query('prompt') prompt: string,
    @Query('threadId', new ParseUUIDPipe()) threadId: string,
    @Req() request: AuthenticatedRequest,
  ): Promise<Observable<MessageEvent>> {
    return this.financialAssistantService.streamAgentResponse(
      prompt || 'Olá, sou seu assistente financeiro. Como posso ajudar você hoje?',
      request.user.id,
      threadId,
    );
  }
}