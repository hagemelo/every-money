import { MessageEvent } from '@nestjs/common';
import { firstValueFrom, toArray } from 'rxjs';
import { financialAssistantAgent } from '../agents/financial-assitant.agent';
import { FinancialAssistantService } from './financial-assitant.service';

jest.mock('../agents/financial-assitant.agent', () => ({
  financialAssistantAgent: {
    stream: jest.fn(),
  },
}));

const mockedStream = financialAssistantAgent.stream as jest.Mock;

describe('FinancialAssistantService', () => {
  let service: FinancialAssistantService;

  beforeEach(() => {
    service = new FinancialAssistantService();
    jest.clearAllMocks();
  });

  it('deve encaminhar o prompt e emitir cada trecho da resposta', async () => {
    mockedStream.mockResolvedValue({
      textStream: (async function* () {
        yield 'Olá, ';
        yield 'como posso ajudar?';
      })(),
    });

    const observable = await service.streamAgentResponse('Quais são minhas despesas?');
    const events = await firstValueFrom(observable.pipe(toArray()));

    expect(mockedStream).toHaveBeenCalledWith('Quais são minhas despesas?');
    expect(events).toEqual<MessageEvent[]>([
      { data: { text: 'Olá, ' } },
      { data: { text: 'como posso ajudar?' } },
    ]);
  });

  it('deve propagar erros ocorridos durante a leitura do textStream', async () => {
    const streamError = new Error('Falha ao ler resposta');

    mockedStream.mockResolvedValue({
      textStream: (async function* () {
        yield 'início';
        throw streamError;
      })(),
    });

    const observable = await service.streamAgentResponse('Analise meu orçamento');

    await expect(firstValueFrom(observable.pipe(toArray()))).rejects.toBe(streamError);
  });
});
