import { DataSource } from "typeorm";

import { makeOrcamentoEntityFake } from "@test/fake/orcamento.fake";
import { Fixture } from "../data-source/fixture";
import { OrcamentoEntity } from "@infrastructure/entities/orcamento.entity";

export class OrcamentoFixture extends Fixture<OrcamentoEntity> {
    static create (dataSource: DataSource): Fixture<OrcamentoEntity> {
      return new OrcamentoFixture({
        createDefault: makeOrcamentoEntityFake,
        repositoryName: 'orcamento_tb',
        dataSource
      })
    }
  }