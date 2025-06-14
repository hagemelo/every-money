import inMemoryDatabaseConfig from '@infrastructure/database/data-source/in-memory-config'
import { newDb, DataType } from 'pg-mem'
import { DataSource } from 'typeorm'
import { v4 } from 'uuid'



export const createDataSource = async (): Promise<DataSource> => {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  })

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'current_database',
  })

  db.public.registerFunction({
    implementation: () => 'test',
    name: 'version',
  })

  db.public.interceptQueries((queryText) => {
    if (queryText.search(/(pg_views|pg_matviews|pg_tables|pg_enum)/g) > -1) {
      return []
    }
    return null
  })

  db.registerExtension('uuid-ossp', (schema) => {
    schema.registerFunction({
      name: 'uuid_generate_v4',
      returns: DataType.uuid,
      implementation: v4,
      impure: true,
    })
  })

  const ds: DataSource = await db.adapters.createTypeormDataSource(
    inMemoryDatabaseConfig,
  )

  await ds.initialize()
  await ds.synchronize()

  return ds
}
