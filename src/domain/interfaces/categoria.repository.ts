import { EveryMoneyRepository } from "@domain/interfaces/every-money-repository"
import { CategoriaEntity } from "@infrastructure/entities/categoria.entity"
import { CategoriaDomain } from "@domain/categoria.domain"

export  interface CategoriaRepository extends EveryMoneyRepository<CategoriaEntity, CategoriaDomain> {
   
    findAllByUsuarioId(usuarioId: number): Promise<CategoriaDomain[]>
}

export const CategoriaRepository = Symbol('CategoriaRepository')