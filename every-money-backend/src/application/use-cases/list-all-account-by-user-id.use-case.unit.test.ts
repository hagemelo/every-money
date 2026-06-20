import { ContaRepository } from "@domain/repositories/conta.repository"
import { ListAllAccountByUserIdUseCase } from "./list-all-account-by-user-id.use-case"
import { createMock } from "@golevelup/ts-jest"
import { makeContaFake } from "@test/fake/conta.fake"
import { makeUsuarioFake } from "@test/fake/usuario.fake"
import { makeTransacaoFake } from "@test/fake/transacao.fake"
import { makeOrcamentoFake } from "@test/fake/orcamento.fake"
import { TipoTransacaoModel } from "@domain/models/tipo-transacao.model"


describe('ListAllAccountByUserIdUseCase', () => {
    let useCase: ListAllAccountByUserIdUseCase
    let contaRepository: ContaRepository

    beforeEach(() => {
        contaRepository = createMock<ContaRepository>()
        useCase = new ListAllAccountByUserIdUseCase(contaRepository)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('Quando contaRepository.findAllByUsuarioId lanca uma exception', () => {
        it('deve lancar uma exception', () => {
            const usuario = makeUsuarioFake()
            jest.spyOn(contaRepository, 'findAllByUsuarioId').mockRejectedValue(new Error('Erro ao listar contas do usuario'))
            expect(() => useCase.execute(usuario.id)).rejects.toThrow('Erro ao listar contas do usuario')
        })
    })

    describe('Quando contaRepository.findAllByUsuarioId retorna uma lista de contas', () => {
        it('deve retornar uma lista de contas', async () => {
            const usuario = makeUsuarioFake()
            jest.spyOn(contaRepository, 'findAllByUsuarioId').mockResolvedValue([makeContaFake(), makeContaFake(), makeContaFake()])
            const result = await useCase.execute(usuario.id)
            expect(result).toBeInstanceOf(Array)
            expect(result).toHaveLength(3)
        })

        it('deve calcular saldoRealizado e saldoPrevisto a partir das transacoes e orcamentos', async () => {
            const usuario = makeUsuarioFake()
            const conta = makeContaFake({
                saldoRealizado: 0,
                saldoPrevisto: 0,
                transacoes: [
                    makeTransacaoFake({ tipo: TipoTransacaoModel.Entrada, valor: 100 }).toModel(),
                    makeTransacaoFake({ tipo: TipoTransacaoModel.Saida, valor: 30 }).toModel(),
                ],
                orcamentos: [
                    makeOrcamentoFake({ limite: 50 }).toModel(),
                    makeOrcamentoFake({ limite: 25 }).toModel(),
                ],
            })
            jest.spyOn(contaRepository, 'findAllByUsuarioId').mockResolvedValue([conta])

            const result = await useCase.execute(usuario.id)

            expect(result[0].saldoRealizado).toBe(70)
            expect(result[0].saldoPrevisto).toBe(75)
        })
    })

    describe('Quando contaRepository.findAllByUsuarioId retorna uma lista vazia', () => {
        it('deve retornar uma lista vazia', async () => {
            const usuario = makeUsuarioFake()
            jest.spyOn(contaRepository, 'findAllByUsuarioId').mockResolvedValue(null)
            const result = await useCase.execute(usuario.id)
            expect(result).toBeInstanceOf(Array)
            expect(result).toHaveLength(0)
        })
    })
})