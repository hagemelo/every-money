import { DataSource } from "typeorm";

import { makeCategoriaEntityFake } from "@test/fake/categoria.fake";
import { Fixture } from "../data-source/fixture";
import { CategoriaEntity } from "@infrastructure/entities/categoria.entity";

export class CategoriaFixture extends Fixture<CategoriaEntity> {
    static create (dataSource: DataSource): Fixture<CategoriaEntity> {
      return new CategoriaFixture({
        createDefault: makeCategoriaEntityFake,
        repositoryName: 'categoria_tb',
        dataSource
      })
    }
  }