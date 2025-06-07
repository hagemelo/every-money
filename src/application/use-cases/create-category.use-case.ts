import { Inject, Injectable, Scope, UnauthorizedException } from "@nestjs/common";
import { CategoriaRepository } from "@domain/interfaces/categoria.repository";
import { Transactional } from "typeorm-transactional";
import { CategoriaDomain } from "@domain/categoria.domain";
import { CreateCategoryData } from "@domain/data/create-category.data";
import { UsuarioRepository } from "@domain/interfaces/usuario.repository";

@Injectable({ scope: Scope.TRANSIENT })
export class CreateCategoryUseCase {

    constructor(
        @Inject(UsuarioRepository) private readonly usuarioRepository: UsuarioRepository,
        @Inject(CategoriaRepository) private readonly categoriaRepository: CategoriaRepository
    ) {}

    @Transactional()
    async execute(data: CreateCategoryData): Promise<CategoriaDomain> {
        const usuario = await this.usuarioRepository.findUserBy(data.usuario);

        if (!usuario) {
            throw new UnauthorizedException('Usuario nao encontrado');
        }
        const newCategoria = new CategoriaDomain(data.categoria);
        usuario.categorias.push(newCategoria);
        newCategoria.addUsuario(usuario);
        const resultNewCategoria = await this.categoriaRepository.saveDomain(newCategoria);
        if (!resultNewCategoria) {
            throw new Error('Erro ao criar categoria');
        }
        return resultNewCategoria;
    }
}