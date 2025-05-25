import { DataSource } from "typeorm";

import { makeContaEntityFake } from "@test/fake/conta.fake";
import { Fixture } from "../data-source/fixture";
import { ContaEntity } from "@infrastructure/entities/conta.entity";

export class ContaFixture extends Fixture<ContaEntity> {
    static create (dataSource: DataSource): Fixture<ContaEntity> {
      return new ContaFixture({
        createDefault: makeContaEntityFake,
        repositoryName: 'conta_tb',
        dataSource
      })
    }
  }