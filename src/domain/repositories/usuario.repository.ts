import { UsuarioDomain } from "@domain/usuario.domain";
import { EveryMoneyRepository } from "@domain/repositories/every-money-repository";
import { UsuarioEntity } from "@infrastructure/entities/usuario.entity";
import { UsuarioModel } from "@domain/models/usuario.model";

export  interface UsuarioRepository extends EveryMoneyRepository<UsuarioEntity, UsuarioDomain> {
    
    findUserByEmailAndPassword(email: string, senha: string): Promise<UsuarioDomain>;
    findAllWithoutPassword(): Promise<UsuarioDomain[]>
    findUserBy(usuario: UsuarioModel): Promise<UsuarioDomain>
}

export const UsuarioRepository = Symbol('UsuarioRepository')
