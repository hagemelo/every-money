import { EveryMoneyRepository } from "@domain/interfaces/every-money-repository"
import { OrcamentoDomain } from "@domain/orcamento.domain"
import { OrcamentoEntity } from "@infrastructure/entities/orcamento.entity"


export  interface OrcamentoRepository extends EveryMoneyRepository<OrcamentoEntity, OrcamentoDomain> {
   
   
}

export const OrcamentoRepository = Symbol('OrcamentoRepository')