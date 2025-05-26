import { UsuarioRepository } from "@domain/interfaces/usuario.repository"
import { FindUserByEmailAndPasswordUseCase } from "./find-user-by-email-and-password.use-case"
import { createMock } from "@golevelup/ts-jest"
import { faker } from "@faker-js/faker/."
import { UnauthorizedException } from "@nestjs/common"
import { makeUsuarioFake } from "@test/fake/usuario.fake"

describe('FindUserByEmailAndPasswordUseCase', () => {
    let findUserByEmailAndPasswordUseCase: FindUserByEmailAndPasswordUseCase
    let usuarioRepository: UsuarioRepository   

    beforeEach(() => {
        usuarioRepository = createMock<UsuarioRepository>()
        findUserByEmailAndPasswordUseCase = new FindUserByEmailAndPasswordUseCase(usuarioRepository)
    })

    describe('Quando findUserByEmailAndPassword lanca uma exception', () => {
        it('deve lancar uma exception', () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            jest.spyOn(usuarioRepository, 'findUserByEmailAndPassword').mockRejectedValue(new Error('Erro ao encontrar usuario'))
            expect(() => findUserByEmailAndPasswordUseCase.execute(email, senha)).rejects.toThrow('Erro ao encontrar usuario')
        })
    })
    
    describe('Quando findUserByEmailAndPassword nao encontra um usuario', () => {

        it('deve lancar uma exception', () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            jest.spyOn(usuarioRepository, 'findUserByEmailAndPassword').mockResolvedValue(null)
            expect(() => findUserByEmailAndPasswordUseCase.execute(email, senha)).rejects.toThrow(new UnauthorizedException('Usuario nao encontrado'))
        })
    })

    describe('Quando findUserByEmailAndPassword encontra um usuario', () => {
        it('deve retornar um usuario', () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioFake({email, senha})
            jest.spyOn(usuarioRepository, 'findUserByEmailAndPassword').mockResolvedValue(fakeUsuario)
            expect(findUserByEmailAndPasswordUseCase.execute(email, senha)).resolves.toEqual(fakeUsuario)
           })
    })
})

