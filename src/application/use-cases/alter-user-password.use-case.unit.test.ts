import { UsuarioRepository } from "@domain/interfaces/usuario.repository"
import { FindUserByEmailAndPasswordUseCase } from "./find-user-by-email-and-password.use-case"
import { createMock } from "@golevelup/ts-jest"
import { faker } from "@faker-js/faker/."
import { UnauthorizedException } from "@nestjs/common"
import { makeUsuarioFake } from "@test/fake/usuario.fake"
import { AlterUserPasswordUseCase } from "./alter-user-password.use-case"
import { AlterUserPasswordData } from "@domain/data/alter-user-password.data"
import { UsuarioDomain } from "@domain/usuario.domain"

jest.mock('typeorm-transactional', () => ({
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    Transactional: () => () => ({}),
  }))
describe('AlterUserPasswordUseCase', () => {
    let alterUserPasswordUseCase: AlterUserPasswordUseCase
    let usuarioRepository: UsuarioRepository   

    beforeEach(() => {
        usuarioRepository = createMock<UsuarioRepository>()
        alterUserPasswordUseCase = new AlterUserPasswordUseCase(usuarioRepository)
    })

    describe('Quando alterUserPasswordUseCase lanca uma exception', () => {
        it('deve lancar uma exception', () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const novaSenha = faker.internet.password()
            const data: AlterUserPasswordData = {email, senha, novaSenha}
            jest.spyOn(usuarioRepository, 'findUserByEmailAndPassword').mockRejectedValue(new Error('Erro ao encontrar usuario'))
            expect(() => alterUserPasswordUseCase.execute(data)).rejects.toThrow('Erro ao encontrar usuario')
        })
    })
    
    describe('Quando alterUserPasswordUseCase nao encontra um usuario', () => {

        it('deve lancar uma exception', () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const novaSenha = faker.internet.password()
            const data: AlterUserPasswordData = {email, senha, novaSenha}
            jest.spyOn(usuarioRepository, 'findUserByEmailAndPassword').mockResolvedValue(null)
            expect(() => alterUserPasswordUseCase.execute(data)).rejects.toThrow(new UnauthorizedException('Usuario nao encontrado'))
        })
    })

    describe('Quando alterUserPasswordUseCase altera a senha do usuario', () => {
        it('deve retornar um usuario', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioFake({email, senha})
            const novaSenha = faker.internet.password()
            const data: AlterUserPasswordData = {email, senha, novaSenha}
            jest.spyOn(usuarioRepository, 'findUserByEmailAndPassword').mockResolvedValue(fakeUsuario)
            jest.spyOn(usuarioRepository, 'saveDomain').mockResolvedValue(fakeUsuario)
            const result = await alterUserPasswordUseCase.execute(data)
            expect(result).toBeInstanceOf(UsuarioDomain)
            expect(result.email).toEqual(fakeUsuario.email)
            expect(result.senha).toEqual(novaSenha)
            })
    })
})

