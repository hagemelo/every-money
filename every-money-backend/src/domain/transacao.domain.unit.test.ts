import { makeTransacaoFake } from "@test/fake/transacao.fake"
import { TransacaoDomain } from "./transacao.domain"
import { TipoTransacaoModel } from "./models/tipo-transacao.model"

describe('TransacaoDomain', () => {
    
    describe('Quando a TransacaoDomain for instanciada', () => {
        it('deve instanciar a transacao', () => {
            const transacao = makeTransacaoFake()
            expect(transacao.id).not.toBeNull()
            expect(transacao.descricao).not.toBeNull()
            expect(transacao.valor).not.toBeNull()
            expect(transacao.data).not.toBeNull()
            expect(transacao.tipo).not.toBeNull()
            expect(transacao.categoria).not.toBeNull()
            expect(transacao.conta).not.toBeNull()
            expect(transacao.createdAt).not.toBeNull()
            expect(transacao.updatedAt).not.toBeNull()
        })

        it('deve devolver valores default com parametros null', () => {
            const transacao = new TransacaoDomain({id: null, 
                descricao: null, valor: null, data: null, tipo: null,
                categoria: null, conta: null, createdAt: null, updatedAt: null})
            transacao.descricao = 'Transacao Teste'
            transacao.valor = 100
            transacao.data = new Date()
            transacao.tipo = TipoTransacaoModel.Entrada
            expect(transacao.descricao).toBe('Transacao Teste')
            expect(transacao.valor).toBe(100)
            expect(transacao.data).not.toBeNull()
            expect(transacao.createdAt).not.toBeNull()
            expect(transacao.updatedAt).not.toBeNull()
            expect(transacao.tipo).toBe(TipoTransacaoModel.Entrada)
        })
    })
})