import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/core';
import { INestApplication, Logger } from '@nestjs/common';

async function migrateDB(app: INestApplication) {
  const orm = app.get(MikroORM);
  const migrator = orm.getMigrator();
  const pendingMigrations = await migrator.getPendingMigrations();
  console.log(
    `Applying ${pendingMigrations.length} pending migrations to database.`,
  );
  await migrator.up(); // runs migration
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await migrateDB(app);

  await app.listen(3000);
}
bootstrap();
