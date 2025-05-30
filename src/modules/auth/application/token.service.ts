import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { UsuarioDomain } from "@domain/usuario.domain";
import { AccessTokenData } from "@domain/data/access-token.data";
import { JwtService } from "@nestjs/jwt";
import { AuthData } from "@domain/data/auth.data";
    
@Injectable()
export class TokenService {

    constructor(
        private jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    generateToken(usuarioDomain: UsuarioDomain): AccessTokenData {
        const secretKey = this.configService.get('jwt.secretKey') || 'secretKey';
        const  payload: AuthData = { email: usuarioDomain.email, senha: usuarioDomain.senha };
        return {
            accessToken: this.jwtService.sign(payload, { secret: secretKey })
        }
    }
    
}
