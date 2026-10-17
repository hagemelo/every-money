
import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { financialAssistantAgent } from '@application/ai/agents/financial-assitant.agent';
import { ListAllCategoriesByUserIdUseCase } from '@application/use-cases/list-all-categories-by-user-id.use-case';
import { listAllCategoriesByUserIdTool } from '../tools/list-all-categories-by-user-id.tool';
import { FINANCIAL_ASSISTANT_MEMORY } from '@infrastructure/ia-memory/mastra-memory.provider';
import type { Memory } from '@mastra/memory';

function isCategoryRequest(prompt: string): boolean {
  const normalizedPrompt = prompt
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

  return /\b(listar|liste|mostrar|mostre|consultar|consulte|ver|minhas)\b.*\bcategorias?\b/.test(
    normalizedPrompt,
  );
}

@Injectable()
export class FinancialAssistantService {

  constructor(
   private readonly listAllCategoriesByUserIdUseCase: ListAllCategoriesByUserIdUseCase,
   @Inject(FINANCIAL_ASSISTANT_MEMORY)
   private readonly memory: Memory,
  ) {}
 
  async streamAgentResponse(
    prompt: string,
    userId: number,
    threadId: string,
  ): Promise<Observable<MessageEvent>> {

    const tool = listAllCategoriesByUserIdTool(
      this.listAllCategoriesByUserIdUseCase,
      userId,
    );

    const agent = financialAssistantAgent([tool], this.memory);
    
    const responseStream = await agent.stream(prompt, {
      maxSteps: 2,
      memory: {
        thread: threadId,
        resource: String(userId),
      },
      ...(isCategoryRequest(prompt) && {
        toolChoice: 'required',
      }),
    });

    return new Observable<MessageEvent>((subscriber) => {
      (async () => {
        try {
         
          for await (const chunk of responseStream.textStream) {
            subscriber.next({
              data: { text: chunk },
            } as MessageEvent);
          }
          subscriber.complete();
        } catch (error) {
          subscriber.error(error);
        }
      })();
    });
  }
}