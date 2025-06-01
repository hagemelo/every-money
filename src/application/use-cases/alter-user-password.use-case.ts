import { UsuarioRepository } from "@domain/interfaces/usuario.repository";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuarioDomain } from "@domain/usuario.domain";
import { AlterUserPasswordData } from "@domain/data/alter-user-password.data";
import { Transactional } from "typeorm-transactional";
import { Scope } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export class AlterUserPasswordUseCase {
    constructor(
        @Inject(UsuarioRepository) private readonly usuarioRepository: UsuarioRepository
    ) {}

    @Transactional()
    async execute(data: AlterUserPasswordData): Promise<UsuarioDomain> {
        const usuario = await this.usuarioRepository.findUserByEmailAndPassword(data.email, data.senha);
        if (!usuario) {
            throw new UnauthorizedException('Usuario nao encontrado');
        }
        usuario.alterarSenha(data.novaSenha);

        return await this.usuarioRepository.saveDomain(usuario);
    }
}   