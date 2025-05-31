import { Inject, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { Scope } from "@nestjs/common";
import { UsuarioRepository } from "@domain/interfaces/usuario.repository";
import { Transactional } from "typeorm-transactional";
import { CreateAccountData } from "@domain/data/create-account.data";
import { ContaRepository } from "@domain/interfaces/conta.repository";
import { UnauthorizedException } from "@nestjs/common";
import { ContaDomain } from "@domain/conta.domain";

@Injectable({ scope: Scope.TRANSIENT })
export class CreateAccountUseCase {

    constructor(
        @Inject(UsuarioRepository) private readonly usuarioRepository: UsuarioRepository,
        @Inject(ContaRepository) private readonly contaRepository: ContaRepository
    ) {}

    @Transactional()
    async execute(data: CreateAccountData): Promise<ContaDomain> {
        const usuario = await this.usuarioRepository.findUserBy(data.usuario);

        if (!usuario) {
            throw new UnauthorizedException('Usuario nao encontrado');
        }
        const newConta = new ContaDomain(data.conta);
        newConta.addUsuario(usuario);
        const resultNewConta = await this.contaRepository.save(newConta);
        if (!resultNewConta) {
            throw new UnprocessableEntityException('Erro ao salvar conta');
        }
        return resultNewConta;
    }
}