import { ContaDomain } from "@domain/conta.domain";
import { ContaRepository } from "@domain/interfaces/conta.repository";
import { Inject, Injectable } from "@nestjs/common";


@Injectable()
export class ListAllAccountByUserIdUseCase {

    constructor(
        @Inject(ContaRepository) private readonly contaRepository: ContaRepository
    ) {}

    async execute(userId: number): Promise<ContaDomain[]> {

        const contas = await this.contaRepository.findAllByUsuarioId(userId);
        return contas ?? [];
    }
}