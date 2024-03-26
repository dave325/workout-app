import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/core';
import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('Workout App API')
    .setDescription('Workout App API design')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
