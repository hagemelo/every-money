import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { TokenService } from './application/token.service';
import { FindUserByEmailAndPasswordUseCase } from '@application/use-cases/find-user-by-email-and-password.use-case';

@Controller('auth')
export class AuthController {
  constructor(private tokenService: TokenService,
    private readonly useCase: FindUserByEmailAndPasswordUseCase
  ) {}

  @Post('login')
  async login(@Request() req) {
    const user = await this.useCase.execute(
      req.body.email,
      req.body.senha,
    );
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.tokenService.generateToken(user);
  }
}
