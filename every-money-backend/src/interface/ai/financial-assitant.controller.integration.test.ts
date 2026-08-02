import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import request = require('supertest');
import { FinancialAssistantService } from '@application/ai/services/financial-assitant.service';
import { FinancialAssistantController } from './financial-assitant.controller';

jest.mock('@application/ai/services/financial-assitant.service', () => ({
  FinancialAssistantService: class FinancialAssistantService {},
}));

describe('FinancialAssistantController (integration)', () => {
  let app: INestApplication;
  const financialAssistantService = {
    streamAgentResponse: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinancialAssistantController],
      providers: [
        {
          provide: FinancialAssistantService,
          useValue: financialAssistantService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await app.close();
  });

  it('deve expor o stream usando o prompt recebido na query', async () => {
    financialAssistantService.streamAgentResponse.mockReturnValue(
      of({ data: { text: 'Resposta financeira' } }),
    );

    await request(app.getHttpServer())
      .get('/ai/chat-stream')
      .query({ prompt: 'Como economizar?' })
      .expect(200)
      .expect('Content-Type', /text\/event-stream/);

    expect(financialAssistantService.streamAgentResponse).toHaveBeenCalledWith(
      'Como economizar?',
    );
  });

  it('deve usar o prompt padrão quando a query não for informada', async () => {
    financialAssistantService.streamAgentResponse.mockReturnValue(
      of({ data: { text: 'Olá!' } }),
    );

    await request(app.getHttpServer())
      .get('/ai/chat-stream')
      .expect(200)
      .expect('Content-Type', /text\/event-stream/);

    expect(financialAssistantService.streamAgentResponse).toHaveBeenCalledWith(
      'Olá, Sou o assistente financeiro da pessoal, como posso ajudar você hoje?',
    );
  });
});
