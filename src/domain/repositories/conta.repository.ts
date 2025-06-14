import { ContaDomain } from "@domain/conta.domain"
import { EveryMoneyRepository } from "@domain/repositories/every-money-repository"
import { ContaEntity } from "@infrastructure/entities/conta.entity"

export  interface ContaRepository extends EveryMoneyRepository<ContaEntity, ContaDomain> {
   
    findAllByUsuarioId(usuarioId: number): Promise<ContaDomain[]>;
    findContaComUsuarioById(id: number): Promise<ContaDomain>;
}

export const ContaRepository = Symbol('ContaRepository');