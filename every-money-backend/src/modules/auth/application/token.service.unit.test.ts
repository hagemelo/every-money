import { TokenService } from "./token.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { createMock } from "@golevelup/ts-jest";
import { makeUsuarioFake } from "@test/fake/usuario.fake";



describe('TokenService', () => {
    let tokenService: TokenService
    let jwtService: JwtService   
    let configService: ConfigService

    beforeEach(() => {
        jwtService = createMock<JwtService>()
        configService = createMock<ConfigService>()
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Quando generateToken e chamado', () => {
        it('deve gerar um token', () => {
            tokenService = new TokenService(jwtService, configService)
            const usuario = makeUsuarioFake()
            const token = tokenService.generateToken(usuario)
            expect(token).toBeDefined()
            expect(token.accessToken).toBeDefined()
        })

        it('deve gerar um token com o valor default de secretKey', () => {
            configService = createMock<ConfigService>({
                get: jest.fn().mockReturnValue(null),
              })
            tokenService = new TokenService(jwtService, configService)
            const usuario = makeUsuarioFake()
            const token = tokenService.generateToken(usuario)
            expect(token).toBeDefined()
            expect(token.accessToken).toBeDefined()
        })
    })

});
