import { listAllCategoriesByUserIdTool } from './list-all-categories-by-user-id.tool';

describe('listAllCategoriesByUserIdTool', () => {
  it('deve consultar e mapear as categorias do usuário', async () => {
    const useCase = {
      execute: jest.fn().mockResolvedValue([
        {
          id: 1,
          nome: 'Alimentação',
          tipo: 'Despesa',
          classificacao: 'Essencial',
        },
      ]),
    };

    const tool = listAllCategoriesByUserIdTool(useCase as any, 5);

    const result = await tool.execute!({}, {} as any);

    expect(useCase.execute).toHaveBeenCalledWith(5);
    expect(result).toEqual({
      categories: [
        {
          id: 1,
          name: 'Alimentação',
          type: 'Despesa',
          classification: 'Essencial',
        },
      ],
    });
  });

  it('deve retornar lista vazia quando não houver categorias', async () => {
    const useCase = {
      execute: jest.fn().mockResolvedValue([]),
    };

    const tool = listAllCategoriesByUserIdTool(useCase as any, 5);

    await expect(tool.execute!({}, {} as any)).resolves.toEqual({
      categories: [],
    });
  });

  it('deve propagar erro do caso de uso', async () => {
    const useCase = {
      execute: jest.fn().mockRejectedValue(new Error('Erro ao buscar categorias')),
    };

    const tool = listAllCategoriesByUserIdTool(useCase as any, 5);

    await expect(tool.execute!({}, {} as any)).rejects.toThrow(
      'Erro ao buscar categorias',
    );
  });
});
