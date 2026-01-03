import { EveryMoneyRepository } from "@domain/repositories/every-money-repository"
import { TransacaoDomain } from "@domain/transacao.domain"
import { TransacaoEntity } from "@infrastructure/entities/transacao.entity"

export type FindAllByContaIdAndMonthAndYearProps = {
    accountId: number
    month?: number
    year?: number
}

export  interface TransacaoRepository extends EveryMoneyRepository<TransacaoEntity, TransacaoDomain> {
   
    findAllByContaId(contaId: number): Promise<TransacaoDomain[]>
    findAllByContaIdAndMonthAndYear(props: FindAllByContaIdAndMonthAndYearProps): Promise<TransacaoDomain[]>
}

export const TransacaoRepository = Symbol('TransacaoRepository')