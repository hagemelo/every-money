import { ListAllCategoriesByUserIdUseCase } from '@application/use-cases/list-all-categories-by-user-id.use-case';
import { createTool, Tool } from '@mastra/core/tools'
import { z } from 'zod'

export function listAllCategoriesByUserIdTool(
  useCase: ListAllCategoriesByUserIdUseCase,
  userId: number,
): Tool {

return createTool({
  id: 'list-all-categories-by-user-id-tool',
  description: 'Lista as categorias financeiras do usuário autenticado.',
  inputSchema: z.object({}),
  outputSchema: z.object({
    categories: z.array(z.object({
      id: z.number(),
      name: z.string(),
      type: z.string(),
      classification: z.string(),
    })),
  }),
  execute: async () => {
    const categories = await useCase.execute(userId);
    return {
      categories: categories.map((category) => ({
        id: category.id,
        name: category.nome,
        type: category.tipo,
        classification: category.classificacao,
      })),
    };
  },
})

}