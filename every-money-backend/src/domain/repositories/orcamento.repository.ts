import { EveryMoneyRepository } from "@domain/repositories/every-money-repository"
import { OrcamentoDomain } from "@domain/orcamento.domain"
import { OrcamentoEntity } from "@infrastructure/entities/orcamento.entity"


export type FindAllByUsuarioIdParams = {
   usuarioId: number
   limit?: number
   offset?: number
}

export  interface OrcamentoRepository extends EveryMoneyRepository<OrcamentoEntity, OrcamentoDomain> {
   
   findAllByUsuarioId(params: FindAllByUsuarioIdParams): Promise<OrcamentoDomain[]> 
}

export const OrcamentoRepository = Symbol('OrcamentoRepository')