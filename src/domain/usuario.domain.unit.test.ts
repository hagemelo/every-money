import { makeUsuarioFake } from "@test/fake/usuario.fake";
import { UsuarioDomain } from "./usuario.domain";
import { makeContaFake } from "@test/fake/conta.fake";
import { makeTransacaoFake } from "@test/fake/transacao.fake";
import { TipoTransacaoModel } from "./models/tipo-transacao.model";
import { makeOrcamentoFake } from "@test/fake/orcamento.fake";
import { makeCategoriaFake } from "@test/fake/categoria.fake";

describe('UsuarioDomain', () => {
    
    describe('Quando a UsuarioDomain for instanciada', () => {
        it('deve instanciar a usuario', () => {
            const usuario = makeUsuarioFake()
            expect(usuario.id).not.toBeNull()
            expect(usuario.nome).not.toBeNull()
            expect(usuario.senha).not.toBeNull()
            expect(usuario.email).not.toBeNull()
            expect(usuario.contas).not.toBeNull()
            expect(usuario.categorias).not.toBeNull()
            expect(usuario.createdAt).not.toBeNull()
            expect(usuario.updatedAt).not.toBeNull()
        })

        it('deve devolver valores default com parametros null', () => {
            const usuario = new UsuarioDomain({nome: null, 
                senha: null, email: null, createdAt: null, updatedAt: null,
                contas: null, categorias: null})
            expect(usuario.nome).toBe('')
            expect(usuario.senha).toBe('')
            expect(usuario.email).toBe('')
            expect(usuario.contas).not.toBeNull()
            expect(usuario.categorias).not.toBeNull()
            expect(usuario.createdAt).not.toBeNull()
            expect(usuario.updatedAt).not.toBeNull()
        })


        it('deve devolver valores default com parametros null', () => {
            const usuario = new UsuarioDomain({nome: null, 
                senha: null, email: null, createdAt: null, updatedAt: null,
                contas: null, categorias: null})
            usuario.nome = 'Usuario Teste'
            usuario.senha = 'senha'
            usuario.email = 'email'
            const usuarioModel = usuario.toModel()
            expect(usuarioModel.nome).toBe('Usuario Teste')
            expect(usuarioModel.senha).toBe('senha')
            expect(usuarioModel.email).toBe('email')
        })

        it('deve chamar toModel da instancia conta com saldos', () => {
            const usuario = makeUsuarioFake({contas: [makeContaFake({transacoes: [makeTransacaoFake({tipo: TipoTransacaoModel.Entrada}), 
                makeTransacaoFake({tipo: TipoTransacaoModel.Saida})],
                orcamentos: [makeOrcamentoFake({limite: 100})]})],
                categorias: [makeCategoriaFake({transacoes: [makeTransacaoFake({tipo: TipoTransacaoModel.Entrada}), 
                    makeTransacaoFake({tipo: TipoTransacaoModel.Saida})]})]
            })
            usuario.calcularSaldos()
            const usuarioModel = usuario.toModel()
            expect(usuarioModel.id).not.toBeNull()
            expect(usuarioModel.nome).not.toBeNull()
            expect(usuarioModel.senha).not.toBeNull()
            expect(usuarioModel.email).not.toBeNull()
            expect(usuarioModel.contas).not.toBeNull()
            expect(usuarioModel.categorias).not.toBeNull()
            expect(usuarioModel.createdAt).not.toBeNull()
            expect(usuarioModel.updatedAt).not.toBeNull()
        })

    });
});
