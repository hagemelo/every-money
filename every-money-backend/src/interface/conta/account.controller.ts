import { CreateAccountUseCase } from "@application/use-cases/create-account.use-case";
import { ListAllAccountByUserIdUseCase } from "@application/use-cases/list-all-account-by-user-id.use-case";
import { CreateAccountData } from "@domain/data/create-account.data";
import { ContaModel } from "@domain/models/conta.model";
import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateAccountDto } from "../swagger/swagger.dto";


@ApiTags('Conta')
@Controller('conta')
export class AccountController {
    constructor(
        private readonly createAccountUseCase: CreateAccountUseCase,
        private readonly listAllAccountByUserIdUseCase: ListAllAccountByUserIdUseCase,
    ) {}

    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Criar conta' })
    @ApiBody({ type: CreateAccountDto })
    @ApiResponse({ status: 201, description: 'Conta criada com sucesso' })
    @UseGuards(AuthGuard('jwt'))
    @Post('criar-conta')
    async criarConta(@Body() data: CreateAccountData): Promise<ContaModel> {
        const conta = await this.createAccountUseCase.execute(data);
        return conta.toModel();
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Listar contas por usuário' })
    @ApiParam({ name: 'id', type: Number, description: 'ID do usuário' })
    @ApiResponse({ status: 200, description: 'Lista de contas' })
    @UseGuards(AuthGuard('jwt'))
    @Get('listar-contas/usuario/:id')
    async listarContas(@Param('id') id: number): Promise<ContaModel[]> {
        const contas = await this.listAllAccountByUserIdUseCase.execute(id);
        return contas.map(conta => conta.toModel());
    }
}
