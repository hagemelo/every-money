import { config } from 'dotenv';

import { join } from 'path';
import { DataSource } from 'typeorm';

config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const dbConfig: DataSource = new DataSource({
  type: 'postgres',
  entities: [join(__dirname, '../../entities/*.entity.{ts,js}')],
  migrations: [join(__dirname, '/migrations/*.{ts,js}')],
  host: process.env.DB_HOST || '127.0.0.1',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'app',
  logging: false,
  synchronize: false,
  port: 5432,
});

export default dbConfig;
