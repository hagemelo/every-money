import { createMock } from "@golevelup/ts-jest"
import { OrcamentoRepository } from "@domain/repositories/orcamento.repository"
import { ListAllBudgetByUserIdUseCase } from "./list-all-budget-by-user-id.use-case"
import { makeUsuarioFake } from "@test/fake/usuario.fake"
import { makeOrcamentoFake } from "@test/fake/orcamento.fake"


describe('ListAllBudgetByUserIdUseCase', () => {
    let useCase: ListAllBudgetByUserIdUseCase
    let repository: OrcamentoRepository

    beforeEach(() => {
            repository = createMock<OrcamentoRepository>()
            useCase = new ListAllBudgetByUserIdUseCase(repository)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Quando repository.findAllByUsuarioId lanca uma exception', () => {
        it('deve lancar uma exception', () => {
            const usuario = makeUsuarioFake()
            jest.spyOn(repository, 'findAllByUsuarioId').mockRejectedValue(new Error('Erro ao listar orcamentos do usuario'))
            expect(() => useCase.execute(usuario.id)).rejects.toThrow('Erro ao listar orcamentos do usuario')
        })
    })

    describe('Quando repository.findAllByUsuarioId retorna uma lista de orcamentos', () => {
        it('deve retornar uma lista de orcamentos', async () => {
            const usuario = makeUsuarioFake()
            jest.spyOn(repository, 'findAllByUsuarioId').mockResolvedValue([makeOrcamentoFake(), makeOrcamentoFake(), makeOrcamentoFake()])
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