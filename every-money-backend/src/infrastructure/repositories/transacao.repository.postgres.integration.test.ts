import { FindAllByContaIdAndMonthAndYearProps, TransacaoRepository } from "@domain/repositories/transacao.repository"
import { TransacaoDomain } from "@domain/transacao.domain"
import { faker } from "@faker-js/faker/."
import { CategoriaFixture } from "@infrastructure/database/fixtures/categoria.fixture"
import { ContaFixture } from "@infrastructure/database/fixtures/conta.fixture"
import { TransacaoFixture } from "@infrastructure/database/fixtures/transacao.fixture"
import { UsuarioFixture } from "@infrastructure/database/fixtures/usuario.fixture"
import { CategoriaEntity } from "@infrastructure/entities/categoria.entity"
import { ContaEntity } from "@infrastructure/entities/conta.entity"
import { TransacaoEntity } from "@infrastructure/entities/transacao.entity"
import { UsuarioEntity } from "@infrastructure/entities/usuario.entity"
import { TestingModule } from "@nestjs/testing"
import { makeCategoriaEntityFakeNew } from "@test/fake/categoria.fake"
import { makeContaEntityFakeNew } from "@test/fake/conta.fake"
import { makeTransacaoEntityFakeNew, makeTransacaoFake } from "@test/fake/transacao.fake"
import { makeUsuarioEntityFakeNew } from "@test/fake/usuario.fake"
import { buildTestingModule } from "@test/testing.module"
import { DataSource } from "typeorm"


let testingModule: TestingModule
let usuarioFixture: UsuarioFixture
let contaFixture: ContaFixture
let categoriaFixture: CategoriaFixture
let transacaoFixture: TransacaoFixture
let transacaoRepository: TransacaoRepository
let dataSource: DataSource

describe('TransacaoRepositoryPostgres', () => {
    beforeAll(async () => {
      testingModule = await buildTestingModule()
      usuarioFixture = testingModule.get(UsuarioFixture)
      contaFixture = testingModule.get(ContaFixture)
      categoriaFixture = testingModule.get(CategoriaFixture)
      transacaoFixture = testingModule.get(TransacaoFixture)
      transacaoRepository = await testingModule.resolve(TransacaoRepository)
      dataSource = testingModule.get(DataSource)
      dataSource.setOptions({ logging: false });
    })
  
    afterEach(async () => {
        await testingModule.get('clearDatabase')()
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })

    describe('Quando a funcao delete for chamada', () => {
        it('deve deletar um Orcamento', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            const fakeConta = makeContaEntityFakeNew({usuario})
            const conta: ContaEntity = await contaFixture.createFixture(fakeConta)
            const fakeCategoria = makeCategoriaEntityFakeNew({usuario})
            const categoria: CategoriaEntity = await categoriaFixture.createFixture(fakeCategoria)
            const fakeTransacao = makeTransacaoEntityFakeNew({conta, categoria})
            const transacao: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao)
            await transacaoRepository.delete(transacao.id)
            const result = await transacaoRepository.findById({id: transacao.id})
            expect(result).toBeNull()
        })
    })

    describe('Quando a funcao save for chamada', () => {
        it('deve salvar uma transacao', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            const fakeConta = makeContaEntityFakeNew({usuario})
            const conta: ContaEntity = await contaFixture.createFixture(fakeConta)
            const fakeCategoria = makeCategoriaEntityFakeNew({usuario})
            const categoria: CategoriaEntity = await categoriaFixture.createFixture(fakeCategoria)
            const transacao = makeTransacaoFake({conta, categoria})
            const result = await transacaoRepository.saveDomain(transacao)
            expect(result).toBeInstanceOf(TransacaoDomain)
            expect(result.data).toBe(transacao.data)
            expect(result.valor).toBe(transacao.valor)
        })
    })

    describe('Quando a funcao findById for chamada', () => {
        it('deve retornar uma transacao', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            const fakeConta = makeContaEntityFakeNew({usuario})
            const conta: ContaEntity = await contaFixture.createFixture(fakeConta)
            const fakeCategoria = makeCategoriaEntityFakeNew({usuario})
            const categoria: CategoriaEntity = await categoriaFixture.createFixture(fakeCategoria)
            const fakeTransacao = makeTransacaoEntityFakeNew({conta, categoria})
            const transacao: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao)
            const result = await transacaoRepository.findById({id: transacao.id})
            expect(result).toBeInstanceOf(TransacaoEntity)
            expect(result.data).toStrictEqual(fakeTransacao.data)
            expect(result.valor).toStrictEqual(fakeTransacao.valor)
        })
    })

    describe('Quando a funcao findAll for chamada', () => {
        it('deve retornar todas as transacoes', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            const fakeConta = makeContaEntityFakeNew({usuario})
            const conta: ContaEntity = await contaFixture.createFixture(fakeConta)
            const fakeCategoria = makeCategoriaEntityFakeNew({usuario})
            const categoria: CategoriaEntity = await categoriaFixture.createFixture(fakeCategoria)
            const fakeTransacao = makeTransacaoEntityFakeNew({conta, categoria})
            const transacao: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao)
            const fakeTransacao2 = makeTransacaoEntityFakeNew({conta, categoria})
            const transacao2: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao2)
            const result = await transacaoRepository.findAll()
            expect(result).toBeInstanceOf(Array)
            expect(result.length).toBe(2)
            expect(result[0].data).toStrictEqual(fakeTransacao.data)
            expect(result[0].valor).toStrictEqual(fakeTransacao.valor)
            expect(result[1].data).toStrictEqual(fakeTransacao2.data)
            expect(result[1].valor).toStrictEqual(fakeTransacao2.valor)
        })
    })

    describe('Quando a funcao findAllByContaId for chamada', () => {
        it('deve retornar todas as transacoes', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            const fakeConta = makeContaEntityFakeNew({usuario})
            const conta: ContaEntity = await contaFixture.createFixture(fakeConta)
            const fakeCategoria = makeCategoriaEntityFakeNew({usuario})
            const categoria: CategoriaEntity = await categoriaFixture.createFixture(fakeCategoria)
            const fakeTransacao = makeTransacaoEntityFakeNew({conta, categoria, data: faker.date.future()})
            const transacao: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao)
            const fakeTransacao2 = makeTransacaoEntityFakeNew({conta, categoria, data: faker.date.past()})
            const transacao2: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao2)
            const result = await transacaoRepository.findAllByContaId(conta.id)
            expect(result).toBeInstanceOf(Array)
            expect(result.length).toBe(2)
            expect(result[0].data).toStrictEqual(fakeTransacao.data)
            expect(result[0].valor).toStrictEqual(fakeTransacao.valor)
            expect(result[1].data).toStrictEqual(fakeTransacao2.data)
            expect(result[1].valor).toStrictEqual(fakeTransacao2.valor)
        })
    })

    describe('Quando a funcao findAllByContaIdAndMonthAndYear for chamada', () => {
        it('deve retornar todas as transacoes', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            const fakeConta = makeContaEntityFakeNew({usuario})
            const conta: ContaEntity = await contaFixture.createFixture(fakeConta)
            const fakeCategoria = makeCategoriaEntityFakeNew({usuario})
            const categoria: CategoriaEntity = await categoriaFixture.createFixture(fakeCategoria)

            const tagetMonth = 2
            const tagetYear = 2025
            const month = 10
            const year = 2024

            const fakeTransacao = makeTransacaoEntityFakeNew({conta, categoria, data: new Date(tagetYear, tagetMonth, 3 )})
            const transacao: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao)
            const fakeTransacao2 = makeTransacaoEntityFakeNew({conta, categoria, data: new Date(tagetYear, tagetMonth, 2 )})
            const transacao2: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao2)
            const fakeTransacao3 = makeTransacaoEntityFakeNew({conta, categoria, data: new Date(year, month )})
            const transacao3: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao3)
            const fakeTransacao4 = makeTransacaoEntityFakeNew({conta, categoria, data: new Date(year, month )})
            const transacao4: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao4)

            const props: FindAllByContaIdAndMonthAndYearProps = {accountId: conta.id, month: tagetMonth+1, year: tagetYear}
            const result = await transacaoRepository.findAllByContaIdAndMonthAndYear(props)
            expect(result).toBeInstanceOf(Array)
            expect(result.length).toBe(2)
            expect(result[0].data).toStrictEqual(fakeTransacao.data)
            expect(result[0].valor).toStrictEqual(fakeTransacao.valor)
            expect(result[1].data).toStrictEqual(fakeTransacao2.data)
            expect(result[1].valor).toStrictEqual(fakeTransacao2.valor)
        })

        it('deve retornar todas as transacoes do ano', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            const fakeConta = makeContaEntityFakeNew({usuario})
            const conta: ContaEntity = await contaFixture.createFixture(fakeConta)
            const fakeCategoria = makeCategoriaEntityFakeNew({usuario})
            const categoria: CategoriaEntity = await categoriaFixture.createFixture(fakeCategoria)
            
            const tagetYear = 2025
            const year = 2024

            const fakeTransacao = makeTransacaoEntityFakeNew({conta, categoria, data: new Date(tagetYear, 8, 3 )})
            const transacao: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao)
            const fakeTransacao2 = makeTransacaoEntityFakeNew({conta, categoria, data: new Date(tagetYear, 3, 2 )})
            const transacao2: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao2)
            const fakeTransacao3 = makeTransacaoEntityFakeNew({conta, categoria, data: new Date(year )})
            const transacao3: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao3)
            const fakeTransacao4 = makeTransacaoEntityFakeNew({conta, categoria, data: new Date(year )})
            const transacao4: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao4)

            const props: FindAllByContaIdAndMonthAndYearProps = {accountId: conta.id, month: undefined, year: tagetYear}
            const result = await transacaoRepository.findAllByContaIdAndMonthAndYear(props)
            expect(result).toBeInstanceOf(Array)
            expect(result.length).toBe(2)
            expect(result[0].data).toStrictEqual(fakeTransacao.data)
            expect(result[0].valor).toStrictEqual(fakeTransacao.valor)
            expect(result[1].data).toStrictEqual(fakeTransacao2.data)
            expect(result[1].valor).toStrictEqual(fakeTransacao2.valor)
        })

         it('deve retornar todas as transacoes do mes', async () => {
            const email = faker.internet.email()
            const senha = faker.internet.password()
            const fakeUsuario = makeUsuarioEntityFakeNew({email, senha})
            const usuario: UsuarioEntity = await usuarioFixture.createFixture(fakeUsuario)
            const fakeConta = makeContaEntityFakeNew({usuario})
            const conta: ContaEntity = await contaFixture.createFixture(fakeConta)
            const fakeCategoria = makeCategoriaEntityFakeNew({usuario})
            const categoria: CategoriaEntity = await categoriaFixture.createFixture(fakeCategoria)

            const tagetMonth = 2
            const tagetYear = 2025
            const month = 10
            const year = 2024

            const fakeTransacao = makeTransacaoEntityFakeNew({conta, categoria, data: new Date(tagetYear, tagetMonth, 3 )})
            const transacao: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao)
            const fakeTransacao2 = makeTransacaoEntityFakeNew({conta, categoria, data: new Date(tagetYear, tagetMonth, 2 )})
            const transacao2: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao2)
            const fakeTransacao3 = makeTransacaoEntityFakeNew({conta, categoria, data: new Date(year, month )})
            const transacao3: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao3)
            const fakeTransacao4 = makeTransacaoEntityFakeNew({conta, categoria, data: new Date(year, month )})
            const transacao4: TransacaoEntity = await transacaoFixture.createFixture(fakeTransacao4)

            const props: FindAllByContaIdAndMonthAndYearProps = {accountId: conta.id, month: tagetMonth+1, year: undefined}
            const result = await transacaoRepository.findAllByContaIdAndMonthAndYear(props)
            expect(result).toBeInstanceOf(Array)
            expect(result.length).toBe(2)
            expect(result[0].data).toStrictEqual(fakeTransacao.data)
            expect(result[0].valor).toStrictEqual(fakeTransacao.valor)
            expect(result[1].data).toStrictEqual(fakeTransacao2.data)
            expect(result[1].valor).toStrictEqual(fakeTransacao2.valor)
        })
    })
})