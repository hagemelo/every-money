import { Body, Controller, Post } from '@nestjs/common';
import { FindUserByEmailAndPasswordUseCase } from '@application/use-cases/find-user-by-email-and-password.use-case';
import { TokenService } from '../application/token.service';
import { AuthData } from '@domain/data/auth.data';

@Controller('auth')
export class AuthController {
  constructor(private tokenService: TokenService,
    private readonly useCase: FindUserByEmailAndPasswordUseCase
  ) {}

  @Post('login')
  async login(@Body() data: AuthData) {
    const user = await this.useCase.execute(
      data.email,
      data.senha,
    );  
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.tokenService.generateToken(user);
  }
}
