import { AlterUserPasswordUseCase } from "@application/use-cases/alter-user-password.use-case";
import { FindUserByEmailAndPasswordUseCase } from "@application/use-cases/find-user-by-email-and-password.use-case";
import { AlterUserPasswordData } from "@domain/data/alter-user-password.data";
import { UsuarioDomain } from "@domain/usuario.domain";
import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";



@Controller('usuario')
export class AlterUserPasswordController {
  constructor(
    private readonly useCase: AlterUserPasswordUseCase,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('alterar-senha')
  async alterarSenha(@Body() data: AlterUserPasswordData): Promise<UsuarioDomain> {
    const user = await this.useCase.execute(data);
    return user;
  }
} 