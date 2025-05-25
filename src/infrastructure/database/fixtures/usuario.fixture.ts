import { DataSource } from "typeorm";

import { makeUsuarioEntityFake } from "@test/fake/usuario.fake";
import { Fixture } from "../data-source/fixture";
import { UsuarioEntity } from "@infrastructure/entities/usuario.entity";

export class UsuarioFixture extends Fixture<UsuarioEntity> {
    static create (dataSource: DataSource): Fixture<UsuarioEntity> {
      return new UsuarioFixture({
        createDefault: makeUsuarioEntityFake,
        repositoryName: 'usuario_tb',
        dataSource
      })
    }
  }