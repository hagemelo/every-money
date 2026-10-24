import { ListAllAccountByUserIdUseCase } from '@application/use-cases/list-all-account-by-user-id.use-case';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export function financialSummaryByUserIdTool(
  useCase: ListAllAccountByUserIdUseCase,
  userId: number,
) {
  return createTool({
    id: 'financial-summary-by-user-id-tool',
    description:
      'Consulta o resumo financeiro do usuário autenticado, incluindo saldo realizado e previsto por conta.',
    inputSchema: z.object({}),
    outputSchema: z.object({
      accounts: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          type: z.string(),
          realizedBalance: z.number(),
          plannedBalance: z.number(),
        }),
      ),
    }),
    execute: async () => {
      const accounts = await useCase.execute(userId);

      return {
        accounts: accounts.map((account) => ({
          id: account.id,
          name: account.nome,
          type: account.tipoConta,
          realizedBalance: account.saldoRealizado,
          plannedBalance: account.saldoPrevisto,
        })),
      };
    },
  });
}
