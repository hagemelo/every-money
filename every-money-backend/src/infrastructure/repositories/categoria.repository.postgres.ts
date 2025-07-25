import { CategoriaDomain } from "@domain/categoria.domain";
import { CategoriaEntity } from "@infrastructure/entities/categoria.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RepositoryPostgres } from "./repository.postgres";
import { CategoriaRepository } from "@domain/repositories/categoria.repository";
import { Injectable } from "@nestjs/common";
import { Scope } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export class CategoriaRepositoryPostgres extends RepositoryPostgres<CategoriaEntity, CategoriaDomain> implements CategoriaRepository {
    

    constructor(
        @InjectRepository(CategoriaEntity)
        private readonly repository: Repository<CategoriaEntity>,
      ) {
        super()
    }

    getRepository(): Repository<CategoriaEntity> {
      return this.repository;
    }

    async findAllByUsuarioId(usuarioId: number): Promise<CategoriaDomain[]> {
      const categorias = await this.repository.find({
          relations: ['transacoes', 'usuario'],
          where: { usuario: { id: usuarioId } },
        });
      return categorias.map(categoria => categoria.toDomain());
    }

    async findCategoriaComUsuarioById(id: number): Promise<CategoriaDomain> {
      const categoria = await this.repository.findOne({
          relations: ['usuario'],
          where: { id },
        });
      return categoria?.toDomain();
    }

    async saveDomain(domain: CategoriaDomain): Promise<CategoriaDomain> {
      const categoriaEntity = CategoriaEntity.fromDomain(domain)
      return this.repository.save(categoriaEntity).then(categoriaEntity => categoriaEntity.toDomain());
    }

}