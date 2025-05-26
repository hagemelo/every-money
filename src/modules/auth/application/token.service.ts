import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { UsuarioDomain } from "@domain/usuario.domain";
import { AccessTokenData } from "@domain/data/access-token.data";
import { JwtService } from "@nestjs/jwt";
import { AuthData } from "@domain/data/auth.data";
import { FindUserByEmailAndPasswordUseCase } from "@application/use-cases/find-user-by-email-and-password.use-case";
    
@Injectable()
export class TokenService {

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    generateToken(usuarioDomain: UsuarioDomain): AccessTokenData {
        const secretKey = this.configService.get('JWT_SECRET') || 'secretKey';
        console.log(secretKey);
        const  payload: AuthData = {   username: usuarioDomain.email, sub: usuarioDomain.senha };
        return {
            accessToken: this.jwtService.sign(payload, { secret: secretKey })
        }
    }
    
}
