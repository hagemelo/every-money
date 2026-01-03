import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1767445615689 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Moradia', 'Aluguel');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Moradia', 'Condomínio');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Moradia', 'Financiamento Imobiliário');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Moradia', 'Água');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Moradia', 'Energia elétrica');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Moradia', 'Gás');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Moradia', 'Internet');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Moradia', 'Telefone');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Moradia', 'TV por assinatura');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Moradia', 'Manutenção/Consertos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Moradia', 'IPTU');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Moradia', 'Seguro residencial');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Alimentação', 'Supermercado');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Alimentação', 'Hortifruti');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Alimentação', 'Padaria');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Alimentação', 'Açougue');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Alimentação', 'Restaurantes');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Alimentação', 'Lanches');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Alimentação', 'Delivery');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Transporte', 'Transporte');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Transporte', 'Combustível');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Transporte', 'Transporte público (ônibus, metrô)');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Transporte', 'Uber/99/Taxi');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Transporte', 'Manutenção do veículo');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Transporte', 'Seguro do carro');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Transporte', 'IPVA');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Transporte', 'Financiamento veicular');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Transporte', 'Estacionamento');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Transporte', 'Pedágios');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Educação', 'Cursos e capacitações');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Educação', 'Faculdade/Escola');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Educação', 'Livros e materiais');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Educação', 'Ferramentas e softwares');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Trabalho', 'Cursos e capacitações');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Trabalho', 'Faculdade/Escola');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Trabalho', 'Livros e materiais');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Trabalho', 'Assinaturas profissionais');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Trabalho', 'Ferramentas e softwares');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Trabalho', 'Deslocamentos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Trabalho', 'Equipamentos de trabalho');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Trabalho', 'Uniformes');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Trabalho', 'Material de consumo');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Saúde', 'Plano de saúde');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Saúde', 'Consultas médicas');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Saúde', 'Medicamentos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Saúde', 'Exames');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Saúde', 'Terapias (psicólogo, fisioterapia, etc.)');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Saúde', 'Odontologia');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Lazer e Entretenimento', 'Cinema');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Lazer e Entretenimento', 'Shows e eventos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Lazer e Entretenimento', 'Viagens');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Lazer e Entretenimento', 'Restaurantes e bares');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Lazer e Entretenimento', 'Streaming (Netflix, Spotify, etc.)');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Lazer e Entretenimento', 'Passeios e hobbies');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Vestuário', 'Roupas');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Vestuário', 'Calçados');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Cuidado Pessoal', 'Cabeleireiro/Barbearia');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Cuidado Pessoal', 'Estética');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Cuidado Pessoal', 'Cosméticos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Cuidado Pessoal', 'Academia');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Cuidado Pessoal', 'Bem-estar (massagem, spa)');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Família e Filhos', 'Escola/Creche');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Família e Filhos', 'Material escolar');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Família e Filhos', 'Roupas infantis');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Família e Filhos', 'Brinquedos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Família e Filhos', 'Atividades extracurriculares');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Animal de Estimação', 'Ração');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Animal de Estimação', 'Veterinário');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Animal de Estimação', 'Banho e tosa');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Animal de Estimação', 'Acessórios');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Dividas e Obrigações', 'Parcelamentos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Dividas e Obrigações', 'Fatura do cartão de crédito');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Dividas e Obrigações', 'Empréstimos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Dividas e Obrigações', 'Financiamentos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Dividas e Obrigações', 'Juros e encargos');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Investimentos', 'Aporte em investimentos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Investimentos', 'Compra de ativos (ações, fundos, cripto, etc.)');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Doações e Presentes', 'Doações');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Doações e Presentes', 'Presentes');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Doações e Presentes', 'Aniversários');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Doações e Presentes', 'Casamentos');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Outros Gastos', 'Multas');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Outros Gastos', 'Taxas bancárias');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Outros Gastos', 'Imprevistos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Outros Gastos', 'Diversos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Saida', 'Outros Gastos', 'Serviços diversos');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Renda Principal', 'Salário');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Renda Principal', 'Pró-labore');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Renda Principal', 'Aposentadoria');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Renda Principal', 'Pensão');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Renda Principal', 'Benefícios governamentais (INSS, Bolsa Família, etc.)');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Renda Extra', 'Freelance');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Renda Extra', 'Consultorias');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Renda Extra', 'Venda de produtos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Renda Extra', 'Venda de serviços');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Renda Extra', 'Aluguel de imóveis');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Renda Extra', 'Renda de aluguel de bens (carro, equipamentos)');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Receita de Investimento', 'Dividendos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Receita de Investimento', 'Juros sobre investimentos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Receita de Investimento', 'Rendimentos de CDB, Tesouro, etc.');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Receita de Investimento', 'Criptomoedas');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Receita de Investimento', 'Aluguel de ações');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Receita de Investimento', 'Venda de ações');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Receita de Investimento', 'Venda de criptomoedas');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Receita de Investimento', 'Venda de fundos imobiliários');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Receita de Investimento', 'Venda de títulos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Receita de Investimento', 'Resgate de aplicação');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Receita de Investimento', 'Juros sobre depósitos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Receita de Investimento', 'Remuneração de fundos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Receita de Investimento', 'Proventos de ações');

insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Outros Receitas', 'Presentes recebidos');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Outros Receitas', 'Herança');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Outros Receitas', 'Reembolso (empresa, saúde, etc.)');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Outros Receitas', 'Premiações');
insert into categoria_tb (usuario_id, created_at, updated_at, tipo, classificacao, nome) values (-1, current_date, current_date, 'Entrada', 'Outros Receitas', 'Restituição de imposto');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            delete from categoria_tb where usuario_id = -1;
        `);
    }

}
