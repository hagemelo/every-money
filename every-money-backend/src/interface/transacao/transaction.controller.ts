import { CreateTransactionUseCase } from "@application/use-cases/create-transaction.use-case";
import { CreateTransactionData } from "@domain/data/create-transaction.data";
import { TransacaoModel } from "@domain/models/transacao.model";
import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";



@Controller('transacao')
export class TransactionController {
    constructor(
        private readonly useCase: CreateTransactionUseCase,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('criar-transacao/conta/:contaId/categoria/:categoriaId')
    async criarTransacao(@Body() transacao: TransacaoModel, @Param('contaId') contaId: number, @Param('categoriaId') categoriaId: number): Promise<TransacaoModel> {
     
        const data: CreateTransactionData = {transacao: transacao, contaId: contaId, categoriaId: categoriaId};
        const transacaoDomain = await this.useCase.execute(data);
        return transacaoDomain.toModel();
    }

}