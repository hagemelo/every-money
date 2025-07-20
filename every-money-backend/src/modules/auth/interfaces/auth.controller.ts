import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { FindUserByEmailAndPasswordUseCase } from '@application/use-cases/find-user-by-email-and-password.use-case';
import { TokenService } from '../application/token.service';
import { AuthData } from '@domain/data/auth.data';
import { AuthenticatedData } from '@domain/data/authenticated.data';

@Controller('auth')
export class AuthController {
  constructor(private tokenService: TokenService,
    private readonly useCase: FindUserByEmailAndPasswordUseCase
  ) {}

  @Post('login')
  async login(@Body() data: AuthData): Promise<AuthenticatedData> {
    const user = await this.useCase.execute(
      data.email,
      data.senha,
    );  
    const {nome: name, email, id} = user;
    const {accessToken} = this.tokenService.generateToken(user);
    return {userAuthenticated: {name, email, id}, accessToken};
  }
}
