import { UsuarioRepository } from "@domain/repositories/usuario.repository"
import { FindUserByUseCase } from "./find-user-by.use-case"
import { createMock } from "@golevelup/ts-jest"
import { faker } from "@faker-js/faker/."
import { UsuarioModel } from "@domain/models/usuario.model"
import { UnauthorizedException } from "@nestjs/common"
import { makeUsuarioFake } from "@test/fake/usuario.fake"

describe('FindUserByUseCase', () => {
    let findUserByUseCase: FindUserByUseCase
    let usuarioRepository: UsuarioRepository   

    beforeEach(() => {
        usuarioRepository = createMock<UsuarioRepository>()
        findUserByUseCase = new FindUserByUseCase(usuarioRepository)
    })
    
    describe('Quando findUserBy lanca uma exception', () => {
        it('deve lancar uma exception', () => {
            const email = faker.internet.email()
            const useCaseParam: UsuarioModel = {email}
            jest.spyOn(usuarioRepository, 'findUserBy').mockRejectedValue(new Error('Erro ao encontrar usuario'))
            expect(() => findUserByUseCase.execute(useCaseParam)).rejects.toThrow('Erro ao encontrar usuario')
        })
    })

     describe('Quando findUserBy nao encontra um usuario', () => {
    
        it('deve lancar uma exception', () => {
            const email = faker.internet.email()
            const useCaseParam: UsuarioModel = {email}
            jest.spyOn(usuarioRepository, 'findUserBy').mockResolvedValue(null)
            expect(() => findUserByUseCase.execute(useCaseParam)).rejects.toThrow(new UnauthorizedException('Usuario nao encontrado'))
        })
    })

    describe('Quando findUserBy encontra um usuario', () => {
        it('deve retornar um usuario', () => {
            const email = faker.internet.email()
            const useCaseParam: UsuarioModel = {email}
            const fakeUsuario = makeUsuarioFake({email})
            jest.spyOn(usuarioRepository, 'findUserBy').mockResolvedValue(fakeUsuario)
            expect(findUserByUseCase.execute(useCaseParam)).resolves.toEqual(fakeUsuario)
        })
    })
    
})