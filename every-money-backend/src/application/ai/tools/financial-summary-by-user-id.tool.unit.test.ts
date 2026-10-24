import { financialSummaryByUserIdTool } from './financial-summary-by-user-id.tool';

describe('financialSummaryByUserIdTool', () => {
  it('deve consultar e mapear o resumo financeiro do usuário', async () => {
    const useCase = {
      execute: jest.fn().mockResolvedValue([
        {
          id: 1,
          nome: 'Conta principal',
          tipoConta: 'Corrente',
          saldoRealizado: 1500.5,
          saldoPrevisto: 1800.75,
        },
      ]),
    };

    const tool = financialSummaryByUserIdTool(useCase as any, 5);

    const result = await tool.execute!({}, {} as any);

    expect(useCase.execute).toHaveBeenCalledWith(5);
    expect(result).toEqual({
      accounts: [
        {
          id: 1,
          name: 'Conta principal',
          type: 'Corrente',
          realizedBalance: 1500.5,
          plannedBalance: 1800.75,
        },
      ],
    });
  });

  it('deve retornar lista vazia quando não houver contas', async () => {
    const useCase = {
      execute: jest.fn().mockResolvedValue([]),
    };

    const tool = financialSummaryByUserIdTool(useCase as any, 5);

    await expect(tool.execute!({}, {} as any)).resolves.toEqual({
      accounts: [],
    });
  });

  it('deve propagar erro do caso de uso', async () => {
    const useCase = {
      execute: jest.fn().mockRejectedValue(new Error('Erro ao buscar contas')),
    };

    const tool = financialSummaryByUserIdTool(useCase as any, 5);

    await expect(tool.execute!({}, {} as any)).rejects.toThrow(
      'Erro ao buscar contas',
    );
  });
});
