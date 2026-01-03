import { TransacaoRepository } from "@domain/repositories/transacao.repository";
import { TransacaoDomain } from "@domain/transacao.domain";
import { Inject, Injectable } from "@nestjs/common";



@Injectable()
export class ListAllTransactionsByAccountIdUseCase {

    constructor(
        @Inject(TransacaoRepository) private readonly repository: TransacaoRepository
    ) {}

    async execute(accountId: number): Promise<TransacaoDomain[]> {

        const transacoes = await this.repository.findAllByContaId(accountId);
        return transacoes ?? [];
    }
}