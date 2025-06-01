import { CategoriaDomain } from "./categoria.domain";
import { ContaDomain } from "./conta.domain";
import { EveryMoneyDomain } from "./every-money.domain";
import { UsuarioModel } from "./models/usuario.model";

export class UsuarioDomain extends EveryMoneyDomain implements UsuarioModel {

    constructor(
        private readonly props: UsuarioModel,
    ) {
        super();
        this.props.nome = props.nome ?? '';
        this.props.email = props.email ?? '';
        this.props.senha = props.senha ?? '';
    }

    get id (): number { return this.props?.id; }
    get nome (): string { return this.props?.nome; }
    get email (): string { return this.props?.email; }
    get senha (): string { return this.props?.senha; }
    get createdAt (): Date { return this.props?.createdAt ?? new Date(); }
    get updatedAt (): Date { return this.props?.updatedAt ?? new Date(); }    
    get contas (): ContaDomain[] {
        return this.props?.contas?.map(conta => new ContaDomain(conta)) ?? []; }
    get categorias (): CategoriaDomain[] {
        return this.props?.categorias?.map(categoria => new CategoriaDomain(categoria)) ?? []; }

    set nome (nome: string) { this.props.nome = nome; }
    set email (email: string) { this.props.email = email; }
    set senha (senha: string) { this.props.senha = senha; }


    toModel (): UsuarioModel {
        return {
            ...this.props,
            contas: this.contas.map(conta => conta.toModel()),
            categorias: this.categorias.map(categoria => categoria.toModel())
        };
    }

    calcularSaldos (): void {
        this.props.contas?.map(conta => new ContaDomain(conta))
        .forEach(conta => {conta.calcularSaldoRealizado(); conta.calcularSaldoPrevisto();});
    }

    alterarSenha (senha: string): void {
        this.props.senha = senha;
    }

}