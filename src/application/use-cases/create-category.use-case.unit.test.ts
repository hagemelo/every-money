import { UsuarioRepository } from "@domain/interfaces/usuario.repository"
import { CreateAccountUseCase } from "./create-account.use-case"
import { createMock } from "@golevelup/ts-jest"
import { ContaRepository } from "@domain/interfaces/conta.repository"
import { makeUsuarioFake } from "@test/fake/usuario.fake"
import { makeContaFake } from "@test/fake/conta.fake"
import { CreateAccountData } from "@domain/data/create-account.data"
import { ContaDomain } from "@domain/conta.domain"
import { CreateCategoryUseCase } from "./create-category.use-case"
import { CategoriaRepository } from "@domain/interfaces/categoria.repository"
import { CreateCategoryData } from "@domain/data/create-category.data"
import { makeCategoriaFake } from "@test/fake/categoria.fake"
import { CategoriaDomain } from "@domain/categoria.domain"

jest.mock('typeorm-transactional', () => ({
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    Transactional: () => () => ({}),
  }))
describe('CreateCategoryUseCase', () => {
    let useCase: CreateCategoryUseCase
    let usuarioRepository: UsuarioRepository   
    let categoriaRepository: CategoriaRepository

    beforeEach(() => {
        usuarioRepository = createMock<UsuarioRepository>()
        categoriaRepository = createMock<CategoriaRepository>()
        useCase = new CreateCategoryUseCase(usuarioRepository, categoriaRepository)
    })

    describe('Quando usuarioRepository.findUserBy lanca uma exception', () => {
        it('deve lancar uma exception', () => {
            const usuario = makeUsuarioFake()
            const categoria = makeCategoriaFake()
            const data: CreateCategoryData = {usuario: usuario.toModel(), categoria: categoria.toModel()}
            jest.spyOn(usuarioRepository, 'findUserBy').mockRejectedValue(new Error('Erro ao encontrar usuario'))
            expect(() => useCase.execute(data)).rejects.toThrow('Erro ao encontrar usuario')
        })
    })

    describe('Quando usuarioRepository.findUserBy nao encontra um usuario', () => {
        it('deve lancar uma exception', async () => {
            const usuario = makeUsuarioFake()
            const categoria = makeCategoriaFake()
            const data: CreateCategoryData ={usuario: usuario.toModel(), categoria: categoria.toModel()}
            jest.spyOn(usuarioRepository, 'findUserBy').mockResolvedValue(null)
            expect(async () => await useCase.execute(data)).rejects.toThrow('Usuario nao encontrado')
        })
    })

    describe('Quando categoriaRepository.save lanca uma exception', () => {
        it('deve lancar uma exception', async () => {
            const usuario = makeUsuarioFake()
            const categoria = makeCategoriaFake()
            const data: CreateCategoryData = {usuario: usuario.toModel(), categoria: categoria.toModel()}
            jest.spyOn(usuarioRepository, 'findUserBy').mockResolvedValue(usuario)
            jest.spyOn(categoriaRepository, 'saveDomain').mockRejectedValue(new Error('Erro ao salvar categoria'))
            let error;
            await useCase.execute(data).catch((e) => error = e)
            const expectedCategoria = categoria
            expectedCategoria.addUsuario(usuario)
            expect(error.message).toBe('Erro ao salvar categoria')
            expect(categoriaRepository.saveDomain).toHaveBeenCalledWith(expectedCategoria)
        })
    })

    describe('Quando a categoria e salva com sucesso', () => {
        it('deve salvar a categoria', async () => {
            const usuario = makeUsuarioFake()
            const categoria = makeCategoriaFake()
            const data: CreateCategoryData = {usuario: usuario.toModel(), categoria: categoria.toModel()}
            jest.spyOn(usuarioRepository, 'findUserBy').mockResolvedValue(usuario)
            jest.spyOn(categoriaRepository, 'saveDomain').mockResolvedValue(categoria)
            const result = await useCase.execute(data)
            const expectedCategoria = categoria
            expectedCategoria.addUsuario(usuario)
            expect(result).toBeInstanceOf(CategoriaDomain)
            expect(result).toEqual(expectedCategoria)
            expect(categoriaRepository.saveDomain).toHaveBeenCalledWith(expectedCategoria)
        })
    })
})