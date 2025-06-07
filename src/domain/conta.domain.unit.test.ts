import { makeContaFake } from "@test/fake/conta.fake"
import { TipoTransacaoModel } from "./models/tipo-transacao.model"
import { makeTransacaoFake } from "@test/fake/transacao.fake"
import { makeOrcamentoFake } from "@test/fake/orcamento.fake"
import { TipoContaModel } from "./models/tipo-conta.model"
import { makeUsuarioFake } from "@test/fake/usuario.fake"
import { ContaDomain } from "./conta.domain"


describe('ContaDomain', () => {
    
    describe('Quando a ContaDomain for instanciada', () => {

        it('deve instanciar a conta', () => {
            const conta = makeContaFake()
            expect(conta.id).not.toBeNull()
            expect(conta.nome).not.toBeNull()
            expect(conta.saldoRealizado).not.toBeNull()
            expect(conta.saldoPrevisto).not.toBeNull()
            expect(conta.tipoConta).not.toBeNull()
            expect(conta.usuario).not.toBeNull()
            expect(conta.createdAt).not.toBeNull()
            expect(conta.updatedAt).not.toBeNull()
            expect(conta.orcamentos).not.toBeNull()
            expect(conta.transacoes).not.toBeNull()
        })

        it('deve calcular o saldo realizado', () => {
            const conta = makeContaFake({transacoes: [makeTransacaoFake({tipo: TipoTransacaoModel.Entrada}), makeTransacaoFake({tipo: TipoTransacaoModel.Saida})]})
            conta.calcularSaldoRealizado();
            expect(conta.saldoRealizado).not.toBe(0)
        })

        it('deve devolver valores default com parametros null, com apenas usuario null', () => {
            const conta = new ContaDomain({nome: null, saldoRealizado:null, 
                saldoPrevisto: null, createdAt: null, updatedAt: null,
                tipoConta: null, usuario: null, transacoes: null, orcamentos: null})
            expect(conta.saldoRealizado).toBe(0)
            expect(conta.saldoPrevisto).toBe(0)
            expect(conta.nome).not.toBeNull()
            expect(conta.saldoRealizado).not.toBeNull()
            expect(conta.saldoPrevisto).not.toBeNull()
            expect(conta.tipoConta).not.toBeNull()
            expect(conta.usuario).toBeNull()
            expect(conta.createdAt).not.toBeNull()
            expect(conta.updatedAt).not.toBeNull()
            expect(conta.orcamentos).not.toBeNull()
            expect(conta.transacoes).not.toBeNull()
        })

        
        it('deve devolver calcular saldos com valores default', () => {
            const conta = new ContaDomain({nome: null, saldoRealizado:null, 
                saldoPrevisto: null, createdAt: null, updatedAt: null,
                tipoConta: null, usuario: null, transacoes: null, orcamentos: null})
            conta.calcularSaldoRealizado()
            conta.calcularSaldoPrevisto()
            expect(conta.saldoRealizado).toBe(0)
            expect(conta.saldoPrevisto).toBe(0)
        })

        it('deve calcular o saldo previsto', () => {
            const conta = makeContaFake({orcamentos: [makeOrcamentoFake({limite: 100})]})
            conta.calcularSaldoPrevisto();
            expect(conta.saldoPrevisto).not.toBe(0)
        })

        it('deve instanciar a conta com nome vazio', () => {
            const conta = new ContaDomain({nome: null, saldoRealizado:null, saldoPrevisto: null, tipoConta: null, usuario: null})
            expect(conta.nome).toBe('')
            expect(conta.saldoRealizado).toBe(0)
            expect(conta.saldoPrevisto).toBe(0)
            expect(conta.tipoConta).toBe(TipoContaModel.Outros)
        })


        it('deve alterar os dados da conta', () => {
            const conta = makeContaFake()
            conta.nome = 'Conta Teste'
            conta.saldoRealizado = 100
            conta.saldoPrevisto = 200
            conta.tipoConta = TipoContaModel.Corrente
            conta.usuario = makeUsuarioFake()
            expect(conta.nome).toBe('Conta Teste')
            expect(conta.saldoRealizado).toBe(100)
            expect(conta.saldoPrevisto).toBe(200)
            expect(conta.tipoConta).toBe(TipoContaModel.Corrente)
            expect(conta.usuario).not.toBeNull()
        })

        it('deve chamar toModel da instancia conta com transacoes', () => {
            const conta = makeContaFake({transacoes: [makeTransacaoFake({tipo: TipoTransacaoModel.Entrada}), 
                makeTransacaoFake({tipo: TipoTransacaoModel.Saida})],
                orcamentos: [makeOrcamentoFake({limite: 100})]})
            const contaModel = conta.toModel()
            expect(contaModel.id).not.toBeNull()
            expect(contaModel.nome).not.toBeNull()
            expect(contaModel.saldoRealizado).not.toBeNull()
            expect(contaModel.saldoPrevisto).not.toBeNull()
            expect(contaModel.tipoConta).not.toBeNull()
            expect(contaModel.usuario).not.toBeNull()
            expect(contaModel.orcamentos).not.toBeNull()
            expect(contaModel.transacoes).not.toBeNull()
        })

    })
})