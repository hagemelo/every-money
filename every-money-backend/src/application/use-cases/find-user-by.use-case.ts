import { UsuarioModel } from "@domain/models/usuario.model";
import { UsuarioRepository } from "@domain/repositories/usuario.repository";
import { UsuarioDomain } from "@domain/usuario.domain";
import { Inject, Injectable, Scope, UnauthorizedException } from "@nestjs/common";


@Injectable({ scope: Scope.TRANSIENT })
export class FindUserByUseCase {
    constructor(
        @Inject(UsuarioRepository) private readonly UsuarioRepository: UsuarioRepository
    ) {}

    async execute(usuario: UsuarioModel): Promise<UsuarioDomain> {
     
        const usuarioDomain = await this.UsuarioRepository.findUserBy(usuario);
        if (!usuarioDomain) {
            throw new UnauthorizedException('Usuario nao encontrado');
        }
        return usuarioDomain;
    }
}
