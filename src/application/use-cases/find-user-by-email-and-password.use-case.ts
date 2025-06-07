import { UsuarioDomain } from "@domain/usuario.domain";
import { UsuarioRepository } from "@domain/repositories/usuario.repository";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Scope } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export class FindUserByEmailAndPasswordUseCase {
    constructor(
        @Inject(UsuarioRepository) private readonly UsuarioRepository: UsuarioRepository
    ) {}

    async execute(email: string, senha: string): Promise<UsuarioDomain> {
        const usuario = await this.UsuarioRepository.findUserByEmailAndPassword(email, senha);
        if (!usuario) {
            throw new UnauthorizedException('Usuario nao encontrado');
        }
        return usuario;
    }
}
