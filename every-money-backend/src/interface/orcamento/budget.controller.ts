import { CreateBudgetUseCase } from "@application/use-cases/create-budget.use-case";
import { ListAllBudgetByUserIdUseCase } from "@application/use-cases/list-all-budget-by-user-id.use-case";
import { OrcamentoModel } from "@domain/models/orcamento.model";
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('orcamento')
export class BudgetController {
    constructor(
        private readonly createBudgetUseCase: CreateBudgetUseCase,
        private readonly listAllBudgetByUserIdUseCase: ListAllBudgetByUserIdUseCase,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('criar-orcamento/conta/:contaId')
    async criarOrcamento(@Body() orcamento: OrcamentoModel, @Param('contaId') contaId: number): Promise<OrcamentoModel> {
     
        const orcamentoDomain = await this.createBudgetUseCase.execute(orcamento, contaId);
        return orcamentoDomain.toModel();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('listar-orcamentos/usuario/:id')
    async listarContas(@Param('id') id: number): Promise<OrcamentoModel[]> {
        const orcamentos = await this.listAllBudgetByUserIdUseCase.execute(id);
        return orcamentos.map(orcamento => orcamento.toModel());
    }

}