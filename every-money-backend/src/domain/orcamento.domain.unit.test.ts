import { makeOrcamentoFake } from "@test/fake/orcamento.fake"
import { OrcamentoDomain } from "./orcamento.domain"
import { TipoCategoriaModel } from "./models/tipo-categoria.model"
import { getCurrentMonthReferenceFromDate } from "@application/helpers/get-current-month-reference"


describe('OrcamentoDomain', () => {
    
    describe('Quando a OrcamentoDomain for instanciada', () => {
        it('deve instanciar a transacao', () => {
            const orcamento = makeOrcamentoFake()
            expect(orcamento.id).not.toBeNull()
            expect(orcamento.mesReferencia).not.toBeNull()
            expect(orcamento.limite).not.toBeNull()
            expect(orcamento.tipoCategoria).not.toBeNull()
            expect(orcamento.conta).not.toBeNull()
            expect(orcamento.createdAt).not.toBeNull()
            expect(orcamento.updatedAt).not.toBeNull()
            expect(orcamento.conta).not.toBeNull()
        })
        
        it('deve devolver valores default com parametros null', () => {
            const orcamento = new OrcamentoDomain({id: null, 
                mesReferencia: null, limite: null, tipoCategoria: null,
                conta: null, createdAt: null, updatedAt: null})
            orcamento.mesReferencia = '202502'
            orcamento.limite = 100
            orcamento.tipoCategoria = TipoCategoriaModel.Outros
            expect(orcamento.mesReferencia).toBe('202502')
            expect(orcamento.limite).toBe(100)
            expect(orcamento.tipoCategoria).toBe(TipoCategoriaModel.Outros)
            expect(orcamento.createdAt).not.toBeNull()
            expect(orcamento.updatedAt).not.toBeNull()
            expect(orcamento.conta).toBeNull()
        })


        it('deve devolver valores default com parametros null, com apenas usuario null', () => {
            const orcamento = new OrcamentoDomain({mesReferencia: null, 
                limite: null, tipoCategoria: null,
                conta: null, createdAt: null, updatedAt: null})
            expect(orcamento.limite).toBe(0)
            expect(orcamento.tipoCategoria).toBe(TipoCategoriaModel.Outros)
            expect(orcamento.createdAt).not.toBeNull()
            expect(orcamento.updatedAt).not.toBeNull()
            expect(orcamento.conta).toBeNull()
            expect(orcamento.mesReferencia).not.toBeNull()
        })

        it('deve devolver mes referência correto quando apenas o ano e fornecido', () => {
            const ano = 2024;
            const now = new Date();
            const nowMonth = now.getMonth();
            const orcamento = new OrcamentoDomain({mesReferencia: null, 
                limite: null, tipoCategoria: null,
                conta: null, createdAt: null, updatedAt: null, ano});

            const expectedMesReferencia =  getCurrentMonthReferenceFromDate(new Date(ano, nowMonth, 1));
            expect(orcamento.mesReferencia).toBe(expectedMesReferencia);
            expect(orcamento.limite).toBe(0)
            expect(orcamento.tipoCategoria).toBe(TipoCategoriaModel.Outros)
            expect(orcamento.createdAt).not.toBeNull()
            expect(orcamento.updatedAt).not.toBeNull()
            expect(orcamento.conta).toBeNull()
    
        })

         it('deve devolver mes referência correto quando apenas o mes e fornecido', () => {
            const mes = 5;
            const orcamento = new OrcamentoDomain({mesReferencia: null, 
                limite: null, tipoCategoria: null,
                conta: null, createdAt: null, updatedAt: null, mes});

            const expectedMesReferencia =  getCurrentMonthReferenceFromDate(new Date(new Date().getFullYear(), mes-1, 1));
            expect(orcamento.mesReferencia).toBe(expectedMesReferencia);
            expect(orcamento.limite).toBe(0)
            expect(orcamento.tipoCategoria).toBe(TipoCategoriaModel.Outros)
            expect(orcamento.createdAt).not.toBeNull()
            expect(orcamento.updatedAt).not.toBeNull()
            expect(orcamento.conta).toBeNull()
    
        })
        
    })
})