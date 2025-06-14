import { EveryMoneyRepository } from "@domain/repositories/every-money-repository"
import { CategoriaEntity } from "@infrastructure/entities/categoria.entity"
import { CategoriaDomain } from "@domain/categoria.domain"

export  interface CategoriaRepository extends EveryMoneyRepository<CategoriaEntity, CategoriaDomain> {
   
    findAllByUsuarioId(usuarioId: number): Promise<CategoriaDomain[]>;
    findCategoriaComUsuarioById(id: number): Promise<CategoriaDomain>;
}

export const CategoriaRepository = Symbol('CategoriaRepository');