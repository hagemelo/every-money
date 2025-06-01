import { UsuarioRepository } from "@domain/interfaces/usuario.repository";
import { UsuarioDomain } from "@domain/usuario.domain";
import { UsuarioEntity } from "@infrastructure/entities/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RepositoryPostgres } from "./repository.postgres";
import { Injectable } from "@nestjs/common";
import { Scope } from "@nestjs/common";
import { UsuarioModel } from "@domain/models/usuario.model";

@Injectable({ scope: Scope.TRANSIENT })
export class UsuarioRepositoryPostgres extends RepositoryPostgres<UsuarioEntity, UsuarioDomain> implements UsuarioRepository {
    

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly repository: Repository<UsuarioEntity>,
      ) {
        super()
      }

    getRepository(): Repository<UsuarioEntity> {
        return this.repository;
    }

    async findUserByEmailAndPassword(email: string, senha: string): Promise<UsuarioDomain> {
        if (!email || !senha) {
           return null;
        }
        const usuario = await this.repository.findOneBy({ email, senha } );
        return usuario?.toDomain();
    }

    async findUserBy(usuario: UsuarioModel): Promise<UsuarioDomain> {
        if (!usuario) {
           return null;
        }
        const usuarioEnt = await this.repository.findOneBy({ ...usuario } );
        return usuarioEnt?.toDomain();
    }

    async saveDomain(domain: UsuarioDomain): Promise<UsuarioDomain> {
        const usuarioEntity = UsuarioEntity.fromDomain(domain)
        return this.repository.save(usuarioEntity).then(usuarioEntity => usuarioEntity.toDomain());
    }

    async findAllWithoutPassword(): Promise<UsuarioDomain[]> {
        const usuarios = await this.repository.find({
            select: ['id', 'nome', 'email', 'createdAt', 'updatedAt']
          });
        return usuarios.map(usuario => usuario.toDomain());
    }
 
}