import { Inject, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { Scope } from "@nestjs/common";
import { UsuarioRepository } from "@domain/repositories/usuario.repository";
import { Transactional } from "typeorm-transactional";
import { CreateAccountData } from "@domain/data/create-account.data";
import { ContaRepository } from "@domain/repositories/conta.repository";
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
        usuario.contas.push(newConta);
        newConta.addUsuario(usuario);
        const resultNewConta = await this.contaRepository.saveDomain(newConta);
        if (!resultNewConta) {
            throw new UnprocessableEntityException('Erro ao salvar conta');
        }
        return resultNewConta;
    }
}