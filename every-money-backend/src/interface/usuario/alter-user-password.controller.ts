import { AlterUserPasswordUseCase } from "@application/use-cases/alter-user-password.use-case";
import { AlterUserPasswordData } from "@domain/data/alter-user-password.data";
import { UsuarioModel } from "@domain/models/usuario.model";
import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AlterUserPasswordDto } from "../swagger/swagger.dto";



@ApiTags('Usuário')
@Controller('usuario')
export class AlterUserPasswordController {
  constructor(
    private readonly useCase: AlterUserPasswordUseCase,
  ) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Alterar senha do usuário' })
  @ApiBody({ type: AlterUserPasswordDto })
  @ApiResponse({ status: 201, description: 'Senha alterada com sucesso' })
  @UseGuards(AuthGuard('jwt'))
  @Post('alterar-senha')
  async alterarSenha(@Body() data: AlterUserPasswordData): Promise<UsuarioModel> {
    const user = await this.useCase.execute(data);
    return user.toModel();
  }
}
