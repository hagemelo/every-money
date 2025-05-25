import { EveryMoneyRepository } from "@domain/interfaces/every-money-repository"
import { TransacaoDomain } from "@domain/transacao.domain"
import { TransacaoEntity } from "@infrastructure/entities/transacao.entity"


export  interface TransacaoRepository extends EveryMoneyRepository<TransacaoEntity, TransacaoDomain> {
   
   
}

export const TransacaoRepository = Symbol('TransacaoRepository')