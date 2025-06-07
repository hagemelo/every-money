import { CategoriaRepository } from "@domain/repositories/categoria.repository"
import { ListAllCategoriesByUserIdUseCase } from "./list-all-categories-by-user-id.use-case"
import { createMock } from "@golevelup/ts-jest"
import { makeUsuarioFake } from "@test/fake/usuario.fake"
import { makeCategoriaFake } from "@test/fake/categoria.fake"

describe('ListAllCategoriesByUserIdUseCase', () => {
    let useCase: ListAllCategoriesByUserIdUseCase
    let repository: CategoriaRepository

    beforeEach(() => {
        repository = createMock<CategoriaRepository>()
        useCase = new ListAllCategoriesByUserIdUseCase(repository)
    })

    describe('Quando repository.findAllByUsuarioId lanca uma exception', () => {
        it('deve lancar uma exception', () => {
            const usuario = makeUsuarioFake()
            jest.spyOn(repository, 'findAllByUsuarioId').mockRejectedValue(new Error('Erro ao listar categorias do usuario'))
            expect(() => useCase.execute(usuario.id)).rejects.toThrow('Erro ao listar categorias do usuario')
        })
    })

    describe('Quando repository.findAllByUsuarioId retorna uma lista de categorias', () => {
        it('deve retornar uma lista de categorias', async () => {
            const usuario = makeUsuarioFake()
            jest.spyOn(repository, 'findAllByUsuarioId').mockResolvedValue([makeCategoriaFake(), makeCategoriaFake(), makeCategoriaFake()])
            const result = await useCase.execute(usuario.id)
            expect(result).toBeInstanceOf(Array)
            expect(result).toHaveLength(3)
        })
    })

    describe('Quando repository.findAllByUsuarioId retorna uma lista vazia', () => {
        it('deve retornar uma lista vazia', async () => {
            const usuario = makeUsuarioFake()
            jest.spyOn(repository, 'findAllByUsuarioId').mockResolvedValue(null)
            const result = await useCase.execute(usuario.id)
            expect(result).toBeInstanceOf(Array)
            expect(result).toHaveLength(0)
        })
    })
})