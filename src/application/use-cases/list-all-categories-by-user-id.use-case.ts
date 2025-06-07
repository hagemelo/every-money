import { CategoriaDomain } from "@domain/categoria.domain";
import { CategoriaRepository } from "@domain/interfaces/categoria.repository";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class ListAllCategoriesByUserIdUseCase {

    constructor(
        @Inject(CategoriaRepository) private readonly categoriaRepository: CategoriaRepository
    ) {}

    async execute(userId: number): Promise<CategoriaDomain[]> {

        const categorias = await this.categoriaRepository.findAllByUsuarioId(userId);
        return categorias ?? [];
    }
}