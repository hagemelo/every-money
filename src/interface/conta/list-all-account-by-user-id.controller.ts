import { ListAllAccountByUserIdUseCase } from "@application/use-cases/list-all-account-by-user-id.use-case";
import { ContaModel } from "@domain/models/conta.model";
import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('conta')
export class ListAllAccountByUserIdController {
  constructor(
    private readonly useCase: ListAllAccountByUserIdUseCase,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('listar-contas/usuario/:id')
  async listarContas(@Param('id') id: number): Promise<ContaModel[]> {
    const contas = await this.useCase.execute(id);
    return contas?.map(conta => conta.toModel()) ?? [];
  }
} 