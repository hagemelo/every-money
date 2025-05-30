import { ContaDomain } from "@domain/conta.domain"
import { EveryMoneyRepository } from "@domain/interfaces/every-money-repository"
import { ContaEntity } from "@infrastructure/entities/conta.entity"

export  interface ContaRepository extends EveryMoneyRepository<ContaEntity, ContaDomain> {
   
    findAllByUsuarioId(usuarioId: number): Promise<ContaDomain[]>
}

export const ContaRepository = Symbol('ContaRepository')