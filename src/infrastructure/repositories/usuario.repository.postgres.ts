import { UsuarioRepository } from "@domain/interfaces/usuario.repository";
import { UsuarioDomain } from "@domain/usuario.domain";
import { UsuarioEntity } from "@infrastructure/entities/usuario.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RepositoryPostgres } from "./repository.postgres";


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

    async findUserByEmailAndPassword(email: string, password: string): Promise<UsuarioDomain> {
        const usuario = await this.repository.findOneBy({ email, senha: password });
        return usuario?.toDomain();
    }

    async save(usuario: UsuarioDomain): Promise<UsuarioDomain> {
        const usuarioEntity = UsuarioEntity.fromDomain(usuario)
        return this.repository.save(usuarioEntity).then(usuarioEntity => usuarioEntity.toDomain());
    }

    async findAllWithoutPassword(): Promise<UsuarioDomain[]> {
        const usuarios = await this.repository.find({
            select: ['id', 'nome', 'email', 'createdAt', 'updatedAt']
          });
        return usuarios.map(usuario => usuario.toDomain());
    }
 
}