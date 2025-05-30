import { resolve } from 'path'
import { DataSource } from 'typeorm'
import {
  Builder,
  fixturesIterator,
  Loader,
  Parser,
  Resolver,
} from 'typeorm-fixtures-cli/dist'

import { createDataSource } from './create-test-datasource'

export let dataSource: DataSource
export const loadFixtures = async (
  fixturesPath: string,
): Promise<Record<string, Record<string, unknown>>> => {
  try {
    dataSource = await createDataSource()

    const loader = new Loader()

    loader.load(resolve(fixturesPath))

    const resolver = new Resolver()

    const fixtures = resolver.resolve(loader.fixtureConfigs)

    const builder = new Builder(dataSource, new Parser(), false)

    let result = {}

    for (const fixture of fixturesIterator(fixtures)) {
      const entity = await builder.build(fixture)
      const persistedEntity = await dataSource
        .getRepository(entity.constructor.name)
        .save(entity)
      result = { ...result, [fixture.name]: { ...persistedEntity } }
    }

    return result
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    throw err
  }
}
