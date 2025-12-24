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
        const expiresIn = this.configService.get('jwt.expiresIn') || '1h';

        const refreshSecretKey = this.configService.get('jwt.refreshSecretKey') || 'secretKey';
        const refreshExpiresIn = this.configService.get('jwt.refreshExpiresIn') || '1h';

        const  payload: AuthData = { email: usuarioDomain.email, senha: usuarioDomain.senha };

        return {
            accessToken: this.jwtService.sign(payload, { secret: secretKey, expiresIn }),
            refreshToken: this.jwtService.sign(payload, { secret: refreshSecretKey, expiresIn: refreshExpiresIn })
        }
    }
    
}
