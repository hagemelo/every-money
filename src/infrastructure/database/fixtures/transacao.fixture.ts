import { DataSource } from "typeorm";

import { makeTransacaoEntityFake } from "@test/fake/transacao.fake";
import { Fixture } from "../data-source/fixture";
import { TransacaoEntity } from "@infrastructure/entities/transacao.entity";

export class TransacaoFixture extends Fixture<TransacaoEntity> {
    static create (dataSource: DataSource): Fixture<TransacaoEntity> {
      return new TransacaoFixture({
        createDefault: makeTransacaoEntityFake,
        repositoryName: 'transacao_tb',
        dataSource
      })
    }
  }