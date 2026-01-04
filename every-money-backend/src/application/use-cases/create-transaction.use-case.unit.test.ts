import { ContaRepository } from "@domain/repositories/conta.repository";
import { CreateTransactionUseCase } from "./create-transaction.use-case";
import { CategoriaRepository } from "@domain/repositories/categoria.repository";
import { TransacaoRepository } from "@domain/repositories/transacao.repository";
import { createMock } from "@golevelup/ts-jest";
import { makeTransacaoFake } from "@test/fake/transacao.fake";
import { faker } from "@faker-js/faker/.";
import { CreateTransactionData } from "@domain/data/create-transaction.data";
import { makeContaEntityFake, makeContaFake } from "@test/fake/conta.fake";
import { makeCategoriaFake } from "@test/fake/categoria.fake";
import { TransacaoDomain } from "@domain/transacao.domain";
import { TipoTransacaoModel } from "@domain/models/tipo-transacao.model";
import { TipoCategoriaModel } from "@domain/models/tipo-categoria.model";


jest.mock('typeorm-transactional', () => ({
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    Transactional: () => () => ({}),
  }))
describe('CreateTransactionUseCase', () => {
    let useCase: CreateTransactionUseCase;
    let contaRepository: ContaRepository; 
    let categoriaRepository: CategoriaRepository;
    let transacaoRepository: TransacaoRepository;

    beforeEach(() => {
        contaRepository = createMock<ContaRepository>({
            findContaComUsuarioById: jest.fn()
        });
        categoriaRepository = createMock<CategoriaRepository>();
        transacaoRepository = createMock<TransacaoRepository>();
        useCase = new CreateTransactionUseCase(contaRepository, categoriaRepository, transacaoRepository);
    });

    describe('Quando contaRepository.findContaComUsuarioById lanca uma exception', () => {
        it('deve lancar uma exception', async () => {
            const transacao = makeTransacaoFake().toModel();
            const contaId = faker.number.int({ max: 100000 });
            const categoriaId = faker.number.int({ max: 100000 });
            const data: CreateTransactionData = {transacao: transacao, contaId: contaId, categoriaId: categoriaId};
            jest.spyOn(contaRepository, 'findContaComUsuarioById').mockRejectedValue(new Error('Erro ao encontrar conta'));
            await expect(useCase.execute(data)).rejects.toThrow('Erro ao encontrar conta');
            expect(contaRepository.findContaComUsuarioById).toHaveBeenCalledWith(contaId);
            expect(categoriaRepository.findCategoriaComUsuarioById).toHaveBeenCalledWith(categoriaId);
            expect(transacaoRepository.saveDomain).not.toHaveBeenCalled();
        });
    });

    describe('Quando contaRepository.findContaComUsuarioById return null', () => {
        it('deve lancar uma exception', async () => {
            const transacao = makeTransacaoFake().toModel();
            const contaId = faker.number.int({ max: 100000 });
            const categoriaId = faker.number.int({ max: 100000 });
            const data: CreateTransactionData = {transacao: transacao, contaId: contaId, categoriaId: categoriaId};
            jest.spyOn(contaRepository, 'findContaComUsuarioById').mockResolvedValue(null);
            let error;
            await useCase.execute(data).catch((e) => error = e);
            expect(error.message).toBe('Conta ou categoria nao encontrados');
            expect(contaRepository.findContaComUsuarioById).toHaveBeenCalledWith(contaId);
            expect(categoriaRepository.findCategoriaComUsuarioById).toHaveBeenCalledWith(categoriaId);
            expect(transacaoRepository.saveDomain).not.toHaveBeenCalled();
        });
    });

    describe('Quando categoriaRepository.findCategoriaComUsuarioById lanca uma exception', () => {
        it('deve lancar uma exception', async () => {
            const transacao = makeTransacaoFake().toModel();
            const contaId = faker.number.int({ max: 100000 });
            const categoriaId = faker.number.int({ max: 100000 });
            const data: CreateTransactionData = {transacao: transacao, contaId: contaId, categoriaId: categoriaId};
            jest.spyOn(categoriaRepository, 'findCategoriaComUsuarioById').mockRejectedValue(new Error('Erro ao encontrar categoria'));
            await expect(useCase.execute(data)).rejects.toThrow('Erro ao encontrar categoria');
            expect(contaRepository.findContaComUsuarioById).toHaveBeenCalledWith(contaId);
            expect(categoriaRepository.findCategoriaComUsuarioById).toHaveBeenCalledWith(categoriaId);
            expect(transacaoRepository.saveDomain).not.toHaveBeenCalled();
        });
    });

    describe('Quando categoriaRepository.findCategoriaComUsuarioById return null', () => {
        it('deve lancar uma exception', async () => {
            const transacao = makeTransacaoFake().toModel();
            const contaId = faker.number.int({ max: 100000 });
            const categoriaId = faker.number.int({ max: 100000 });
            const data: CreateTransactionData = {transacao: transacao, contaId: contaId, categoriaId: categoriaId};
            jest.spyOn(categoriaRepository, 'findCategoriaComUsuarioById').mockResolvedValue(null);
            let error;
            await useCase.execute(data).catch((e) => error = e);
            expect(error.message).toBe('Conta ou categoria nao encontrados');
            expect(contaRepository.findContaComUsuarioById).toHaveBeenCalledWith(contaId);
            expect(categoriaRepository.findCategoriaComUsuarioById).toHaveBeenCalledWith(categoriaId);
            expect(transacaoRepository.saveDomain).not.toHaveBeenCalled();
        });
    });

    describe('Quando o Usuario da conta e da categoria forem diferentes', () => {
        it('deve lancar uma exception', async () => {
            const transacaoDomain = makeTransacaoFake();
            const contaId = faker.number.int({ max: 100000 });
            const categoriaId = faker.number.int({ max: 100000 });
            const conta = makeContaFake();
            const categoria = makeCategoriaFake();
            const expectedTransacao = transacaoDomain
            expectedTransacao.addConta(conta);
            expectedTransacao.addCategoria(categoria);
            const data: CreateTransactionData = {transacao: transacaoDomain.toModel(), contaId: contaId, categoriaId: categoriaId};
            jest.spyOn(categoriaRepository, 'findCategoriaComUsuarioById').mockResolvedValue(categoria);
            jest.spyOn(contaRepository, 'findContaComUsuarioById').mockResolvedValue(conta);
            let error;
            await useCase.execute(data).catch((e) => error = e);
            expect(error.message).toBe('Conta e categoria devem pertencer ao mesmo usuario');
            expect(contaRepository.findContaComUsuarioById).toHaveBeenCalledWith(contaId);
            expect(categoriaRepository.findCategoriaComUsuarioById).toHaveBeenCalledWith(categoriaId);
            expect(transacaoRepository.saveDomain).not.toHaveBeenCalled();
        });
    });

     describe('Quando o Tipo de transacao e da categoria forem diferentes', () => {
        it('deve lancar uma exception', async () => {
            const transacaoDomain = makeTransacaoFake({tipo: TipoTransacaoModel.Saida});
            const contaId = faker.number.int({ max: 100000 });
            const categoriaId = faker.number.int({ max: 100000 });
            const conta = makeContaFake();
            const categoria = makeCategoriaFake({usuario: conta.usuario, tipo: TipoCategoriaModel.Entrada});
            const expectedTransacao = transacaoDomain;
            expectedTransacao.addConta(conta);
            expectedTransacao.addCategoria(categoria);

            const data: CreateTransactionData = {transacao: transacaoDomain.toModel(), contaId: contaId, categoriaId: categoriaId};
            jest.spyOn(categoriaRepository, 'findCategoriaComUsuarioById').mockResolvedValue(categoria);
            jest.spyOn(contaRepository, 'findContaComUsuarioById').mockResolvedValue(conta);
            let error;
            await useCase.execute(data).catch((e) => error = e);
            expect(error.message).toBe('Tipo de transacao e categoria devem ser iguais');
            expect(contaRepository.findContaComUsuarioById).toHaveBeenCalledWith(contaId);
            expect(categoriaRepository.findCategoriaComUsuarioById).toHaveBeenCalledWith(categoriaId);
            expect(transacaoRepository.saveDomain).not.toHaveBeenCalled();
        });
    });

    describe('Quando transacaoRepository.saveDomain lanca uma exception', () => {
        it('deve lancar uma exception', async () => {
            const transacaoDomain = makeTransacaoFake({tipo: TipoTransacaoModel.Saida});
            const contaId = faker.number.int({ max: 100000 });
            const categoriaId = faker.number.int({ max: 100000 });
            const conta = makeContaFake();
            const categoria = makeCategoriaFake({usuario: conta.usuario, tipo: TipoCategoriaModel.Saida});

            const expectedTransacao = transacaoDomain;
            expectedTransacao.addConta(conta);
            expectedTransacao.addCategoria(categoria);

            const data: CreateTransactionData = {transacao: transacaoDomain.toModel(), contaId: contaId, categoriaId: categoriaId};
            jest.spyOn(categoriaRepository, 'findCategoriaComUsuarioById').mockResolvedValue(categoria);
            jest.spyOn(contaRepository, 'findContaComUsuarioById').mockResolvedValue(conta);
            jest.spyOn(transacaoRepository, 'saveDomain').mockRejectedValue(new Error('Erro ao salvar transacao'));
            let error;
            await useCase.execute(data).catch((e) => error = e);
            expect(error.message).toBe('Erro ao salvar transacao');
            expect(contaRepository.findContaComUsuarioById).toHaveBeenCalledWith(contaId);
            expect(categoriaRepository.findCategoriaComUsuarioById).toHaveBeenCalledWith(categoriaId);
            expect(transacaoRepository.saveDomain).toHaveBeenCalledWith(expectedTransacao);
        });
    });

    describe('Quando transacaoRepository.saveDomain devolve null', () => {
        it('deve lancar uma exception', async () => {
            const transacaoDomain = makeTransacaoFake({tipo: TipoTransacaoModel.Entrada});
            const contaId = faker.number.int({ max: 100000 });
            const categoriaId = faker.number.int({ max: 100000 });
            const conta = makeContaFake();
            const categoria = makeCategoriaFake({usuario: conta.usuario, tipo: TipoCategoriaModel.Entrada});
            const expectedTransacao = transacaoDomain;
            expectedTransacao.addConta(conta);
            expectedTransacao.addCategoria(categoria);
            const data: CreateTransactionData = {transacao: transacaoDomain.toModel(), contaId: contaId, categoriaId: categoriaId};
            jest.spyOn(categoriaRepository, 'findCategoriaComUsuarioById').mockResolvedValue(categoria);
            jest.spyOn(contaRepository, 'findContaComUsuarioById').mockResolvedValue(conta);
            jest.spyOn(transacaoRepository, 'saveDomain').mockResolvedValue(null);
            let error;
            await useCase.execute(data).catch((e) => error = e);
            expect(error.message).toBe('Erro ao criar transacao');
            expect(contaRepository.findContaComUsuarioById).toHaveBeenCalledWith(contaId);
            expect(categoriaRepository.findCategoriaComUsuarioById).toHaveBeenCalledWith(categoriaId);
            expect(transacaoRepository.saveDomain).toHaveBeenCalledWith(expectedTransacao);
        });
    });

    describe('Quando a transacao e salva com sucesso', () => {
        it('deve salvar a transacao', async () => {
            const transacaoDomain = makeTransacaoFake({tipo: TipoTransacaoModel.Entrada});
            const contaId = faker.number.int({ max: 100000 });
            const categoriaId = faker.number.int({ max: 100000 });
            const conta = makeContaFake();
            const categoria = makeCategoriaFake({usuario: conta.usuario, tipo: TipoCategoriaModel.Entrada});
            const expectedTransacao = transacaoDomain;
            expectedTransacao.addConta(conta);
            expectedTransacao.addCategoria(categoria);
            const data: CreateTransactionData = {transacao: transacaoDomain.toModel(), contaId: contaId, categoriaId: categoriaId};
            jest.spyOn(categoriaRepository, 'findCategoriaComUsuarioById').mockResolvedValue(categoria);
            jest.spyOn(contaRepository, 'findContaComUsuarioById').mockResolvedValue(conta);
            jest.spyOn(transacaoRepository, 'saveDomain').mockResolvedValue(expectedTransacao);
            const result = await useCase.execute(data);
            expect(result).toBeInstanceOf(TransacaoDomain);
            expect(result).toEqual(expectedTransacao);
            expect(contaRepository.findContaComUsuarioById).toHaveBeenCalledWith(contaId);
            expect(categoriaRepository.findCategoriaComUsuarioById).toHaveBeenCalledWith(categoriaId);
            expect(transacaoRepository.saveDomain).toHaveBeenCalledWith(expectedTransacao);
        });
    });

});