import { CreateBudgetUseCase } from "@application/use-cases/create-budget.use-case";
import { OrcamentoModel } from "@domain/models/orcamento.model";
import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('orcamento')
export class BudgetController {
    constructor(
        private readonly createBudgetUseCase: CreateBudgetUseCase,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('criar-orcamento/conta/:contaId')
    async criarOrcamento(@Body() orcamento: OrcamentoModel, @Param('contaId') contaId: number): Promise<OrcamentoModel> {
     
        const orcamentoDomain = await this.createBudgetUseCase.execute(orcamento, contaId);
        return orcamentoDomain.toModel();
    }

}