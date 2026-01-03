import { EveryMoneyRepository } from "@domain/repositories/every-money-repository"
import { TransacaoDomain } from "@domain/transacao.domain"
import { TransacaoEntity } from "@infrastructure/entities/transacao.entity"

export type FindAllByContaIdAndMonthAndYearParams = {
    accountId: number
    month?: number
    year?: number
    limit?: number
    offset?: number
}

export type FindAllByContaIdParams = {
   accountId: number
   limit?: number
   offset?: number
}

export  interface TransacaoRepository extends EveryMoneyRepository<TransacaoEntity, TransacaoDomain> {
   
    findAllByContaId(params: FindAllByContaIdParams): Promise<TransacaoDomain[]>
    findAllByContaIdAndMonthAndYear(params: FindAllByContaIdAndMonthAndYearParams): Promise<TransacaoDomain[]>
}

export const TransacaoRepository = Symbol('TransacaoRepository')