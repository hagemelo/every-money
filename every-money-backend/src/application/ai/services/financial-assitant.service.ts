// src/mastra/mastra.service.ts
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { financialAssistantAgent } from '../agents/financial-assitant.agent';
import { ListAllCategoriesByUserIdUseCase } from '@application/use-cases/list-all-categories-by-user-id.use-case';
import { listAllCategoriesByUserIdTool } from '../tools/list-all-categories-by-user-id.tool';

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
   private readonly listAllCategoriesByUserIdUseCase: ListAllCategoriesByUserIdUseCase
  ) {}
 
  async streamAgentResponse(
    prompt: string,
    userId: number,
  ): Promise<Observable<MessageEvent>> {

    const tool = listAllCategoriesByUserIdTool(
      this.listAllCategoriesByUserIdUseCase,
      userId,
    );

    const agent = financialAssistantAgent([tool]);
    
    const responseStream = await agent.stream(prompt, {
      maxSteps: 2,
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