import { UsuarioRepository } from "@domain/interfaces/usuario.repository"
import { CreateAccountUseCase } from "./create-account.use-case"
import { createMock } from "@golevelup/ts-jest"
import { ContaRepository } from "@domain/interfaces/conta.repository"
import { makeUsuarioFake } from "@test/fake/usuario.fake"
import { makeContaFake } from "@test/fake/conta.fake"
import { CreateAccountData } from "@domain/data/create-account.data"
import { ContaDomain } from "@domain/conta.domain"

jest.mock('typeorm-transactional', () => ({
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    Transactional: () => () => ({}),
  }))
describe('CreateAccountUseCase', () => {
    let useCase: CreateAccountUseCase
    let usuarioRepository: UsuarioRepository   
    let contaRepository: ContaRepository

    beforeEach(() => {
        usuarioRepository = createMock<UsuarioRepository>()
        contaRepository = createMock<ContaRepository>()
        useCase = new CreateAccountUseCase(usuarioRepository, contaRepository)
    })

    describe('Quando usuarioRepository.findUserBy lanca uma exception', () => {
        it('deve lancar uma exception', () => {
            const usuario = makeUsuarioFake()
            const conta = makeContaFake()
            const data: CreateAccountData = {usuario: usuario.toModel(), conta: conta.toModel()}
            jest.spyOn(usuarioRepository, 'findUserBy').mockRejectedValue(new Error('Erro ao encontrar usuario'))
            expect(() => useCase.execute(data)).rejects.toThrow('Erro ao encontrar usuario')
        })
    })

    describe('Quando usuarioRepository.findUserBy nao encontra um usuario', () => {
        it('deve lancar uma exception', async () => {
            const usuario = makeUsuarioFake()
            const conta = makeContaFake()
            const data: CreateAccountData ={usuario: usuario.toModel(), conta: conta.toModel()}
            jest.spyOn(usuarioRepository, 'findUserBy').mockResolvedValue(null)
            expect(async () => await useCase.execute(data)).rejects.toThrow('Usuario nao encontrado')
        })
    })

    describe('Quando contaRepository.save lanca uma exception', () => {
        it('deve lancar uma exception', async () => {
            const usuario = makeUsuarioFake()
            const conta = makeContaFake()
            const data: CreateAccountData = {usuario: usuario.toModel(), conta: conta.toModel()}
            jest.spyOn(usuarioRepository, 'findUserBy').mockResolvedValue(usuario)
            jest.spyOn(contaRepository, 'save').mockRejectedValue(new Error('Erro ao salvar conta'))
            let error;
            await useCase.execute(data).catch((e) => error = e)
            const expectedConta = conta
            expectedConta.addUsuario(usuario)
            expect(error.message).toBe('Erro ao salvar conta')
            expect(contaRepository.save).toHaveBeenCalledWith(expectedConta)
        })
    })

    describe('Quando a conta e salva com sucesso', () => {
        it('deve salvar a conta', async () => {
            const usuario = makeUsuarioFake()
            const conta = makeContaFake()
            const data: CreateAccountData = {usuario: usuario.toModel(), conta: conta.toModel()}
            jest.spyOn(usuarioRepository, 'findUserBy').mockResolvedValue(usuario)
            jest.spyOn(contaRepository, 'save').mockResolvedValue(conta)
            const result = await useCase.execute(data)
            const expectedConta = conta
            expectedConta.addUsuario(usuario)
            expect(result).toBeInstanceOf(ContaDomain)
            expect(result).toEqual(expectedConta)
            expect(contaRepository.save).toHaveBeenCalledWith(expectedConta)
        })
    })
})