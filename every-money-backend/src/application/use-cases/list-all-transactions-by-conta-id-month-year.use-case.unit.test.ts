import { ListAllTransactionsByAccountIdUseCase } from "./list-all-transactions-by-account-id.use-case"
import { createMock } from "@golevelup/ts-jest"
import { TransacaoRepository } from "@domain/repositories/transacao.repository"
import { faker } from "@faker-js/faker/."
import { makeTransacaoFake } from "@test/fake/transacao.fake"
import { ListAllTransactionsByContaIdMonthYearUseCase } from "./list-all-transactions-by-conta-id-month-year.use-case"


describe('ListAllTransactionsByContaIdMonthYearUseCase', () => {
    let useCase: ListAllTransactionsByContaIdMonthYearUseCase
    let repository: TransacaoRepository

    beforeEach(() => {
        repository = createMock<TransacaoRepository>()
        useCase = new ListAllTransactionsByContaIdMonthYearUseCase(repository)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Quando repository.findAllByContaIdAndMonthAndYear lanca uma exception', () => {
        it('deve lancar uma exception', () => {
            const accountId = faker.number.int();
            jest.spyOn(repository, 'findAllByContaIdAndMonthAndYear').mockRejectedValue(new Error('Erro ao listar transacoes da conta'))
            expect(() => useCase.execute({accountId})).rejects.toThrow('Erro ao listar transacoes da conta')
        })
    })

    describe('Quando repository.findAllByContaIdAndMonthAndYear retorna uma lista de transacoes', () => {
        it('deve retornar uma lista de transacoes', async () => {
            const accountId = faker.number.int();
            jest.spyOn(repository, 'findAllByContaIdAndMonthAndYear').mockResolvedValue([makeTransacaoFake(), makeTransacaoFake(), makeTransacaoFake()])
            const result = await useCase.execute({accountId, month: 1, year: 2024})
            expect(result).toBeInstanceOf(Array)
            expect(result).toHaveLength(3)
        })
    })

    describe('Quando repository.findAllByContaIdAndMonthAndYear retorna uma lista vazia', () => {
        it('deve retornar uma lista vazia', async () => {
            const accountId = faker.number.int();
            jest.spyOn(repository, 'findAllByContaIdAndMonthAndYear').mockResolvedValue(null)
            const result = await useCase.execute({accountId, month: 1, year: 2024})
            expect(result).toBeInstanceOf(Array)
            expect(result).toHaveLength(0)
        })
    })
})