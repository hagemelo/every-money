import { JwtRefreshStrategy } from "./jwt.refresh.strategy"
import { ConfigService } from "@nestjs/config"
import { createMock } from "@golevelup/ts-jest"


describe('JwtRefreshStrategy', () => {
    let jwtRefreshStrategy: JwtRefreshStrategy
    let configService: ConfigService

    beforeEach(() => {
        configService = createMock<ConfigService>()
        
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Quando validate e chamado', () => {

        it('deve gerar refreshToken', async () => {
            jwtRefreshStrategy = new JwtRefreshStrategy(configService)
            const payload = { email: 'email', senha: 'senha' }
            const req = { get: jest.fn().mockReturnValue('Bearer refreshToken') }
            const result = await jwtRefreshStrategy.validate(req, payload)
            expect(result).toBeDefined()
            expect(result.email).toBe(payload.email)
            expect(result.senha).toBe(payload.senha)
            expect(result.refreshToken).toBe('refreshToken')
        })
    })
})