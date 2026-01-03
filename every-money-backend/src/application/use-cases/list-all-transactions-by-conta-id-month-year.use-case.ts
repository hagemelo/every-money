
import { TransacaoRepository } from "@domain/repositories/transacao.repository";
import { TransacaoDomain } from "@domain/transacao.domain";
import { Inject, Injectable } from "@nestjs/common";

export type ListAllTransactionsByContaIdMonthYearProps = {
    accountId: number;
    month?: number;
    year?: number;
};

@Injectable()
export class ListAllTransactionsByContaIdMonthYearUseCase {

    constructor(
        @Inject(TransacaoRepository) private readonly repository: TransacaoRepository
    ) {}

    async execute(props: ListAllTransactionsByContaIdMonthYearProps): Promise<TransacaoDomain[]> {

        const transacoes = await this.repository.findAllByContaIdAndMonthAndYear(props);
        return transacoes ?? [];
    }
}