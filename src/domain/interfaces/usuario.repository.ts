import { UsuarioDomain } from "@domain/usuario.domain";
import { EveryMoneyRepository } from "@domain/interfaces/every-money-repository";
import { UsuarioEntity } from "@infrastructure/entities/usuario.entity";

export  interface UsuarioRepository extends EveryMoneyRepository<UsuarioEntity, UsuarioDomain> {
    
    findUserByEmailAndPassword(email: string, password: string): Promise<UsuarioDomain>;
    findAllWithoutPassword(): Promise<UsuarioDomain[]>
}

export const UsuarioRepository = Symbol('UsuarioRepository')
