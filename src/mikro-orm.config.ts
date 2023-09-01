import { Options } from '@mikro-orm/core';
import { Logger } from '@nestjs/common';
const logger = new Logger('MikroORM');

const config: Options = {
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  dbName: 'workout-service',
  host: '127.0.0.1',
  port: 5433,
  user: 'postgres',
  password: 'postgres',
  type: 'postgresql',
  logger: logger.log.bind(logger),
  debug: true,
  discovery: { warnWhenNoEntities: false },
};
export default config;
