import { CreateAccountUseCase } from "@application/use-cases/create-account.use-case";
import { CreateAccountData } from "@domain/data/create-account.data";
import { ContaModel } from "@domain/models/conta.model";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Controller('conta')
export class CreateAccountController {
  constructor(
    private readonly useCase: CreateAccountUseCase,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('criar-conta')
  async criarConta(@Body() data: CreateAccountData): Promise<ContaModel> {
    const conta = await this.useCase.execute(data);
    return conta.toModel();
  }
} 