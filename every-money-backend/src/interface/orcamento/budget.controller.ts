import { CreateBudgetUseCase } from "@application/use-cases/create-budget.use-case";
import { ListAllBudgetByUserIdUseCase } from "@application/use-cases/list-all-budget-by-user-id.use-case";
import { OrcamentoModel } from "@domain/models/orcamento.model";
import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateBudgetDto, PaginationQueryDto } from "../swagger/swagger.dto";

type PaginationQuery = {
    limit?: number
    offset?: number
}

@ApiTags('Orçamento')
@Controller('orcamento')
export class BudgetController {
    constructor(
        private readonly createBudgetUseCase: CreateBudgetUseCase,
        private readonly listAllBudgetByUserIdUseCase: ListAllBudgetByUserIdUseCase,
    ) {}

    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Criar orçamento' })
    @ApiParam({ name: 'contaId', type: Number, description: 'ID da conta' })
    @ApiBody({ type: CreateBudgetDto })
    @ApiResponse({ status: 201, description: 'Orçamento criado com sucesso' })
    @UseGuards(AuthGuard('jwt'))
    @Post('criar-orcamento/conta/:contaId')
    async criarOrcamento(@Body() orcamento: OrcamentoModel, @Param('contaId') contaId: number): Promise<OrcamentoModel> {
     
        const orcamentoDomain = await this.createBudgetUseCase.execute(orcamento, contaId);
        return orcamentoDomain.toModel();
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Listar orçamentos por usuário' })
    @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
    @ApiQuery({ type: PaginationQueryDto })
    @ApiResponse({ status: 200, description: 'Lista de orçamentos' })
    @UseGuards(AuthGuard('jwt'))
    @Get('listar-orcamentos/usuario/:id')
    async listarOrcamentos(@Param('id') id: number, @Query() query: PaginationQuery): Promise<OrcamentoModel[]> {

        const orcamentos = await this.listAllBudgetByUserIdUseCase.execute({usuarioId: id, ...query});
        return orcamentos.map(orcamento => orcamento.toModel());
    }

}
