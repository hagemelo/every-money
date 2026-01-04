import { makeCategoriaFake } from "@test/fake/categoria.fake";
import { makeTransacaoFake } from "@test/fake/transacao.fake";
import { TipoTransacaoModel } from "./models/tipo-transacao.model";
import { CategoriaDomain } from "./categoria.domain";
import { TipoCategoriaModel } from "./models/tipo-categoria.model";
import { ClassificacaoCategoriaModel } from "./models/classificacao-categoria.model";

describe('CategoriaDomain', () => {

    describe('Quando a CategoriaDomain for instanciada', () => {
        it('deve instanciar a categoria', () => {
            const categoria = makeCategoriaFake()
            expect(categoria.id).not.toBeNull()
            expect(categoria.nome).not.toBeNull()
            expect(categoria.tipo).not.toBeNull()
            expect(categoria.classificacao).not.toBeNull()
            expect(categoria.usuario).not.toBeNull()
            expect(categoria.transacoes).not.toBeNull()
        })

        it('deve devolver categorias com valores default', () => {
            const categoria = new CategoriaDomain({nome: null, tipo:null, classificacao: null, usuario: null})
            expect(categoria.nome).toBe('')
            expect(categoria.tipo).toBe(TipoCategoriaModel.Saida)
            expect(categoria.classificacao).toBe(ClassificacaoCategoriaModel.OutrosGastos)
            expect(categoria.usuario).toBeNull()
            expect(categoria.createdAt).not.toBeNull()
            expect(categoria.updatedAt).not.toBeNull()
        })

        it('deve instanciar a categoria com nome vazio', () => {
            const categoria = new CategoriaDomain({nome: null, tipo:null, classificacao: null, usuario: null})
            expect(categoria.nome).toBe('')
            expect(categoria.tipo).toBe(TipoCategoriaModel.Saida)
            expect(categoria.classificacao).toBe(ClassificacaoCategoriaModel.OutrosGastos)
        })

        it('deve devolver o saldo realizado zero com transacoes de lista vazia', () => {
            const categoria = makeCategoriaFake()
            expect(categoria.saldoRealizado).toBe(0)
        })

        it('deve devolver o saldo realizado zero com transacoes null', () => {
            const categoria = new CategoriaDomain({nome: null, tipo:null, classificacao: null, usuario: null, transacoes: null})
            expect(categoria.saldoRealizado).toBe(0)
        })

        it('deve devolver o saldo realizado', () => {
            const categoria = makeCategoriaFake({transacoes: [makeTransacaoFake({tipo: TipoTransacaoModel.Entrada}), makeTransacaoFake({tipo: TipoTransacaoModel.Saida})]})
            expect(categoria.saldoRealizado).not.toBe(0)
        })

        it('deve chamar toModel da instancia categoria com transacoes', () => {
            const categoria = makeCategoriaFake({transacoes: [makeTransacaoFake({tipo: TipoTransacaoModel.Entrada}), makeTransacaoFake({tipo: TipoTransacaoModel.Saida})]})
            const categoriaModel = categoria.toModel()
            expect(categoriaModel.id).not.toBeNull()
            expect(categoriaModel.nome).not.toBeNull()
            expect(categoriaModel.tipo).not.toBeNull()
            expect(categoriaModel.classificacao).not.toBeNull()
            expect(categoriaModel.usuario).not.toBeNull()
            expect(categoriaModel.transacoes).not.toBeNull()
        })
    })
});