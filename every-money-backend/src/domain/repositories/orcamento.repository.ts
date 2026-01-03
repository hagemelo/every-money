import { EveryMoneyRepository } from "@domain/repositories/every-money-repository"
import { OrcamentoDomain } from "@domain/orcamento.domain"
import { OrcamentoEntity } from "@infrastructure/entities/orcamento.entity"
import { TipoCategoriaModel } from "@domain/models/tipo-categoria.model"


export type FindAllByUsuarioIdParams = {
   usuarioId: number
   limit?: number
   offset?: number
}

export type LookupByMesReferenciaAndTipoCategoriaParams = {
   mesReferencia?: string
   tipoCategoria?: TipoCategoriaModel
   contaId?: number
}

export  interface OrcamentoRepository extends EveryMoneyRepository<OrcamentoEntity, OrcamentoDomain> {
   
   findAllByUsuarioId(params: FindAllByUsuarioIdParams): Promise<OrcamentoDomain[]>
   lookupByMesReferenciaAndTipoCategoriaAndContaId(params: LookupByMesReferenciaAndTipoCategoriaParams): Promise<OrcamentoDomain[]>
}

export const OrcamentoRepository = Symbol('OrcamentoRepository')