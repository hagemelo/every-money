import { MessageEvent } from '@nestjs/common';
import { firstValueFrom, toArray } from 'rxjs';
import { financialAssistantAgent } from '../agents/financial-assitant.agent';
import { FinancialAssistantService } from './financial-assitant.service';
import { ListAllCategoriesByUserIdUseCase } from '@application/use-cases/list-all-categories-by-user-id.use-case';
import { createMock } from '@golevelup/ts-jest';
import { listAllCategoriesByUserIdTool } from '../tools/list-all-categories-by-user-id.tool';

const mockedStream = jest.fn();

jest.mock('../agents/financial-assitant.agent', () => ({
  financialAssistantAgent: jest.fn(() => ({
    stream: mockedStream,
  })),
}));

jest.mock('../tools/list-all-categories-by-user-id.tool', () => ({
  listAllCategoriesByUserIdTool: jest.fn(() => ({
    id: 'list-all-categories-by-user-id-tool',
  })),
}));

describe('FinancialAssistantService', () => {
  let service: FinancialAssistantService;
  let listAllCategoriesByUserIdUseCase: ListAllCategoriesByUserIdUseCase;

  beforeEach(() => {
    listAllCategoriesByUserIdUseCase = createMock<ListAllCategoriesByUserIdUseCase>();

    service = new FinancialAssistantService(listAllCategoriesByUserIdUseCase);
    jest.clearAllMocks();
  });

  it('deve encaminhar o prompt e emitir cada trecho da resposta', async () => {
    mockedStream.mockResolvedValue({
      textStream: (async function* () {
        yield 'Olá, ';
        yield 'como posso ajudar?';''
      })(),
    });

    const observable = await service.streamAgentResponse(
      'Quais são minhas despesas?',
      42,
    );
    const events = await firstValueFrom(observable.pipe(toArray()));

    expect(mockedStream).toHaveBeenCalledWith('Quais são minhas despesas?', {
      maxSteps: 2,
    });
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

    const observable = await service.streamAgentResponse('Analise meu orçamento', 42);

    await expect(firstValueFrom(observable.pipe(toArray()))).rejects.toBe(streamError);
  });

  it('deve exigir a tool ao solicitar a listagem de categorias', async () => {
    mockedStream.mockResolvedValue({
      textStream: (async function* () {
        yield 'Estas são suas categorias.';
      })(),
    });

    const observable = await service.streamAgentResponse(
      'Listar as categorias',
      42,
    );

    await firstValueFrom(observable.pipe(toArray()));

    expect(mockedStream).toHaveBeenCalledWith('Listar as categorias', {
      maxSteps: 2,
      toolChoice: 'required',
    });
  });
});
