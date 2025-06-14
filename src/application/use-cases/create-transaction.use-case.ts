import { CreateTransactionData } from "@domain/data/create-transaction.data";
import { CategoriaRepository } from "@domain/repositories/categoria.repository";
import { ContaRepository } from "@domain/repositories/conta.repository";
import { TransacaoRepository } from "@domain/repositories/transacao.repository";
import { TransacaoDomain } from "@domain/transacao.domain";
import { Inject, Injectable, NotAcceptableException, NotFoundException, Scope, UnprocessableEntityException } from "@nestjs/common";
import { Transactional } from "typeorm-transactional";

@Injectable({ scope: Scope.TRANSIENT })
export class CreateTransactionUseCase {

    constructor(
        @Inject(ContaRepository) private readonly contaRepository: ContaRepository,
        @Inject(CategoriaRepository) private readonly categoriaRepository: CategoriaRepository,
        @Inject(TransacaoRepository) private readonly transacaoRepository: TransacaoRepository,
    ) {}

    @Transactional()
    async execute(data: CreateTransactionData): Promise<TransacaoDomain> {''
        const [conta, categoria] = await Promise.all([
            this.contaRepository.findContaComUsuarioById(data.contaId),
            this.categoriaRepository.findCategoriaComUsuarioById(data.categoriaId),
        ]);

        if (!conta || !categoria) {
            throw new NotFoundException('Conta ou categoria nao encontrados');
        }

        if (conta.usuario.id !== categoria.usuario.id) {
            throw new NotAcceptableException('Conta e categoria devem pertencer ao mesmo usuario');
        }

        const newTransacao = new TransacaoDomain(data.transacao);

        newTransacao.addConta(conta);
        newTransacao.addCategoria(categoria);
        const resultNewTransacao = await this.transacaoRepository.saveDomain(newTransacao);
        if (!resultNewTransacao) {
            throw new UnprocessableEntityException('Erro ao criar transacao');
        }
        return resultNewTransacao;
    }
}