import { JwtStrategy } from "./jwt.strategy"
import { ConfigService } from "@nestjs/config"
import { createMock } from "@golevelup/ts-jest"


describe('JwtStrategy', () => {
    let jwtStrategy: JwtStrategy
    let configService: ConfigService

    beforeEach(() => {
        configService = createMock<ConfigService>()
        
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Quando validate e chamado', () => {
        it('deve validar o payload', async () => {
            jwtStrategy = new JwtStrategy(configService)
            const payload = { email: 'email', senha: 'senha' }
            const result = await jwtStrategy.validate(payload)
            expect(result).toBeDefined()
            expect(result.username).toBe(payload.email)
            expect(result.sub).toBe(payload.senha)
        })

        it('deve validar o payload com secretKey', async () => {
            configService = createMock<ConfigService>({
                get: jest.fn().mockReturnValue(null)
            })
            jwtStrategy = new JwtStrategy(configService)
            const payload = { email: 'email', senha: 'senha' }
            const result = await jwtStrategy.validate(payload)
            expect(result).toBeDefined()
            expect(result.username).toBe(payload.email)
            expect(result.sub).toBe(payload.senha)
        })
    })
})