import { CreateTransactionUseCase } from "@application/use-cases/create-transaction.use-case";
import { ListAllTransactionsByAccountIdUseCase } from "@application/use-cases/list-all-transactions-by-account-id.use-case";
import { ListAllTransactionsByContaIdMonthYearUseCase } from "@application/use-cases/list-all-transactions-by-conta-id-month-year.use-case";
import { CreateTransactionData } from "@domain/data/create-transaction.data";
import { TransacaoModel } from "@domain/models/transacao.model";
import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

type PaginationQuery = {
    limit?: number
    offset?: number
}

@Controller('transacao')
export class TransactionController {
    constructor(
        private readonly useCase: CreateTransactionUseCase,
        private readonly listAllTransactionsByAccountIdUseCase: ListAllTransactionsByAccountIdUseCase,
        private readonly listAllTransactionsByContaIdMonthYearUseCase: ListAllTransactionsByContaIdMonthYearUseCase
        
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('criar-transacao/conta/:contaId/categoria/:categoriaId')
    async criarTransacao(@Body() transacao: TransacaoModel, @Param('contaId') contaId: number, @Param('categoriaId') categoriaId: number): Promise<TransacaoModel> {
     
        const data: CreateTransactionData = {transacao: transacao, contaId: contaId, categoriaId: categoriaId};
        const transacaoDomain = await this.useCase.execute(data);
        return transacaoDomain.toModel();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('listar-transacoes/conta/:id')
    async listarTransacoesPorConta(@Param('id') id: number, @Query() query: PaginationQuery): Promise<TransacaoModel[]> {
        const transacoes = await this.listAllTransactionsByAccountIdUseCase.execute({accountId: id, ...query});
        return transacoes.map(transacao => transacao.toModel());
    }
  
    @UseGuards(AuthGuard('jwt'))
    @Get('listar-transacoes/conta/:id/ano/:ano/mes/:mes')
    async listarTransacoesPorContaEPeriodo(@Param('id') id: number, @Param('ano') ano: number, @Param('mes') mes: number, @Query() query: PaginationQuery): Promise<TransacaoModel[]> {
        const useCaseInput = { accountId: id, year: ano, month: mes, ...query };
        const transacoes = await this.listAllTransactionsByContaIdMonthYearUseCase.execute(useCaseInput);
        return transacoes.map(transacao => transacao.toModel());
    }

}