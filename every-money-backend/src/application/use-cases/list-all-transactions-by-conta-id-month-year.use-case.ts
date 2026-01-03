
import { FindAllByContaIdAndMonthAndYearParams, TransacaoRepository } from "@domain/repositories/transacao.repository";
import { TransacaoDomain } from "@domain/transacao.domain";
import { Inject, Injectable } from "@nestjs/common";



@Injectable()
export class ListAllTransactionsByContaIdMonthYearUseCase {

    constructor(
        @Inject(TransacaoRepository) private readonly repository: TransacaoRepository
    ) {}

    async execute(params: FindAllByContaIdAndMonthAndYearParams): Promise<TransacaoDomain[]> {

        const transacoes = await this.repository.findAllByContaIdAndMonthAndYear(params);
        return transacoes ?? [];
    }
}