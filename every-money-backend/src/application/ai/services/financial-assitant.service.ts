// src/mastra/mastra.service.ts
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MessageEvent } from '@nestjs/common';
import { financialAssistantAgent } from '../agents/financial-assitant.agent';

@Injectable()
export class FinancialAssistantService {
 
  async streamAgentResponse(prompt: string): Promise<Observable<MessageEvent>> {
    
    const responseStream = await financialAssistantAgent.stream(prompt);

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