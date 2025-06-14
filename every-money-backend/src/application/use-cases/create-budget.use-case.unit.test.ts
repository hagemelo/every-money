import { ContaRepository } from "@domain/repositories/conta.repository";
import { CreateBudgetUseCase } from "./create-budget.use-case";
import { OrcamentoRepository } from "@domain/repositories/orcamento.repository";
import { createMock } from "@golevelup/ts-jest";
import { makeOrcamentoFake } from "@test/fake/orcamento.fake";
import { makeContaEntityFake, makeContaFake } from "@test/fake/conta.fake";
import { OrcamentoDomain } from "@domain/orcamento.domain";

jest.mock('typeorm-transactional', () => ({
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    Transactional: () => () => ({}),
  }))
describe('CreateBudgetUseCase', () => {
    let useCase: CreateBudgetUseCase
    let contaRepository: ContaRepository
    let orcamentoRepository: OrcamentoRepository

    beforeEach(() => {
        contaRepository = createMock<ContaRepository>()
        orcamentoRepository = createMock<OrcamentoRepository>()
        useCase = new CreateBudgetUseCase(contaRepository, orcamentoRepository)
    });

    describe('Quando contaRepository.findById lanca uma exception', () => {
        it('deve lancar uma exception', () => {
            const orcamento = makeOrcamentoFake()
            const conta = makeContaFake()
            jest.spyOn(contaRepository, 'findById').mockRejectedValue(new Error('Erro ao encontrar conta'))
            expect(() => useCase.execute(orcamento, conta.id)).rejects.toThrow('Erro ao encontrar conta')
        });
    });

    describe('Quando contaRepository.findById nao encontra uma conta', () => {
        it('deve lancar uma exception', () => {
            const orcamento = makeOrcamentoFake()
            const conta = makeContaFake()
            jest.spyOn(contaRepository, 'findById').mockResolvedValue(null)
            expect(() => useCase.execute(orcamento, conta.id)).rejects.toThrow('Conta nao encontrada')
        });
    });

    describe('Quando orcamentoRepository.save lanca uma exception', () => {
        it('deve lancar uma exception', async () => {
            const orcamento = makeOrcamentoFake()
            const conta = makeContaEntityFake()
            jest.spyOn(contaRepository, 'findById').mockResolvedValue(conta)
            jest.spyOn(orcamentoRepository, 'saveDomain').mockRejectedValue(new Error('Erro ao criar orcamento'))
            let error;
            await useCase.execute(orcamento.toModel(), conta.id).catch((e) => error = e)
            const expectedOrcamento = orcamento
            expectedOrcamento.addConta(conta.toDomain())
            expect(error.message).toBe('Erro ao criar orcamento')
            expect(orcamentoRepository.saveDomain).toHaveBeenCalledWith(expectedOrcamento)
        })
    });

    describe('Quando orcamentoRepository.save devolve null', () => {
        it('deve lancar uma exception', async () => {
            const orcamento = makeOrcamentoFake()
            const conta = makeContaEntityFake()
            jest.spyOn(contaRepository, 'findById').mockResolvedValue(conta)
            jest.spyOn(orcamentoRepository, 'saveDomain').mockResolvedValue(null)
            let error;
            await useCase.execute(orcamento.toModel(), conta.id).catch((e) => error = e)
            const expectedOrcamento = orcamento
            expectedOrcamento.addConta(conta.toDomain())
            expect(error.message).toBe('Erro ao criar orcamento')
            expect(orcamentoRepository.saveDomain).toHaveBeenCalledWith(expectedOrcamento)
        })
    });

    describe('Quando o orcamento e salvo com sucesso', () => {
        it('deve salvar o orcamento', async () => {
            const orcamento = makeOrcamentoFake()
            const conta = makeContaEntityFake()
            jest.spyOn(contaRepository, 'findById').mockResolvedValue(conta)
            jest.spyOn(orcamentoRepository, 'saveDomain').mockResolvedValue(orcamento)
            const result = await useCase.execute(orcamento.toModel(), conta.id)
            const expectedOrcamento = orcamento
            expectedOrcamento.addConta(conta.toDomain())
            expect(result).toBeInstanceOf(OrcamentoDomain)
            expect(result).toEqual(expectedOrcamento)
            expect(orcamentoRepository.saveDomain).toHaveBeenCalledWith(expectedOrcamento)
        })
    });

});