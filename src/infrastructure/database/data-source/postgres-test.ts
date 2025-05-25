import { DataType, type IMemoryDb, newDb } from 'pg-mem'
import { DataSource } from 'typeorm'
import inMemoryDatabaseConfig from './in-memory-config'
import { initializeTransactionalContext } from 'typeorm-transactional'

let db: IMemoryDb

initializeTransactionalContext()

const initDatabase = (): IMemoryDb => {

    db = newDb({
        autoCreateForeignKeyIndices: true
    })
    
    db.public.registerFunction({
        implementation: () => 'test',
        name: 'current_database',
      })
    

      db.public.registerFunction({
        implementation: () => 'test',
        name: 'version',
      })
    
      db.public.registerFunction({
        name: 'obj_description',
        args: [DataType.text, DataType.text],
        returns: DataType.text,
        implementation: () => 'test',
      })
    
      db.public.interceptQueries((queryText) => {
        if (queryText.search(/(pg_views|pg_matviews|pg_tables|pg_enum)/g) > -1) {
          return []
        }
        return null
      })
    
    return db
}

export const createPostgresDataSourceTest = async (): Promise<DataSource> => {
    const database = initDatabase()
    const dataSource: DataSource = await database.adapters.createTypeormDataSource(inMemoryDatabaseConfig)
    await dataSource.initialize()
    await dataSource.synchronize()
    return dataSource
}