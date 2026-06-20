import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { FindUserByEmailAndPasswordUseCase } from '@application/use-cases/find-user-by-email-and-password.use-case';
import { TokenService } from '../application/token.service';
import { AuthData } from '@domain/data/auth.data';
import { AuthenticatedData } from '@domain/data/authenticated.data';
import { AuthGuard } from '@nestjs/passport';
import { FindUserByUseCase } from '@application/use-cases/find-user-by.use-case';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDto, AuthenticatedResponseDto, TokenResponseDto } from '../../../interface/swagger/swagger.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private tokenService: TokenService,
    private readonly useCase: FindUserByEmailAndPasswordUseCase,
    private readonly useCaseBy: FindUserByUseCase
  ) {}

  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: AuthDto })
  @ApiResponse({ status: 201, type: AuthenticatedResponseDto })
  @Post('login')
  async login(@Body() data: AuthData): Promise<AuthenticatedData> {
    const user = await this.useCase.execute(
      data.email,
      data.senha,
    );  
    const {nome: name, email, id} = user;
    const {accessToken, refreshToken} = this.tokenService.generateToken(user);
    return {userAuthenticated: {name, email, id}, accessToken, refreshToken};
  }


  @ApiBearerAuth('JWT-refresh')
  @ApiOperation({ summary: 'Renovar tokens' })
  @ApiResponse({ status: 201, type: TokenResponseDto })
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  async refresh(@Req() req) {

    const {email} = req.user
    const user = await this.useCaseBy.execute({email});
    return this.tokenService.generateToken(user);
  }
}
