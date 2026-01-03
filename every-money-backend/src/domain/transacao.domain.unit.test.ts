import { makeTransacaoFake } from "@test/fake/transacao.fake"
import { TransacaoDomain } from "./transacao.domain"
import { TipoTransacaoModel } from "./models/tipo-transacao.model"
import { faker } from "@faker-js/faker/."
import { StatusTransacaoModel } from "./models/status-transacao.model"

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
            expect(transacao.mesReferencia).not.toBeNull()
        })

        it('deve devolver valores default com parametros null', () => {
            const transacao = new TransacaoDomain({id: null, 
                descricao: null, valor: null, data: null, tipo: null,
                categoria: null, conta: null, createdAt: null, updatedAt: null, mesReferencia: null})
            transacao.descricao = 'Transacao Teste'
            transacao.valor = 100
            transacao.data = new Date()
            transacao.tipo = TipoTransacaoModel.Entrada
            expect(transacao.descricao).toBe('Transacao Teste')
            expect(transacao.valor).toBe(100)
            expect(transacao.data).not.toBeNull()
            expect(transacao.createdAt).not.toBeNull()
            expect(transacao.updatedAt).not.toBeNull()
            expect(transacao.mesReferencia).not.toBeNull()
            expect(transacao.tipo).toBe(TipoTransacaoModel.Entrada)
        })

        it('deve aportar que a transacao esta avencer', () => {
            const transacao = makeTransacaoFake({data: faker.date.future(), status: StatusTransacaoModel.Atrasada})
            transacao.checkStatus()
            expect(transacao.status).toBe(StatusTransacaoModel.Avencer)
        })

        it('deve aportar que a transacao esta atrasada', () => {
            const transacao = makeTransacaoFake({data: faker.date.past(), status: StatusTransacaoModel.Avencer})
            transacao.checkStatus()
            expect(transacao.status).toBe(StatusTransacaoModel.Atrasada)
        })

        it('deve aportar que a transacao esta paga', () => {
            const transacao = makeTransacaoFake({status: StatusTransacaoModel.Avencer})
            transacao.pagar()
            expect(transacao.status).toBe(StatusTransacaoModel.Paga)
        })

        it('deve aportar que a transacao esta recebida', () => {
            const transacao = makeTransacaoFake({status: StatusTransacaoModel.Avencer})
            transacao.receber()
            expect(transacao.status).toBe(StatusTransacaoModel.Recebida)
        })

        it('deve aportar que a transacao esta cancelada', () => {
            const transacao = makeTransacaoFake({status: StatusTransacaoModel.Avencer})
            transacao.cancelar()
            expect(transacao.status).toBe(StatusTransacaoModel.Cancelada)
        })
    })
})