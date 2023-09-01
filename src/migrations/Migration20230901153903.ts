import { Migration } from '@mikro-orm/migrations';

export class Migration20230901153903 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "workout" drop constraint "workout_user_id_id_foreign";');

    this.addSql('alter table "user" add column "weight" int null, add column "height" int null;');

    this.addSql('alter table "workout" add column "sets" int not null, add column "reps" int not null;');
    this.addSql('alter table "workout" rename column "user_id_id" to "user_id";');
    this.addSql('alter table "workout" add constraint "workout_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "workout" drop constraint "workout_user_id_foreign";');

    this.addSql('alter table "user" drop column "weight";');
    this.addSql('alter table "user" drop column "height";');

    this.addSql('alter table "workout" add column "user_id_id" int not null;');
    this.addSql('alter table "workout" add constraint "workout_user_id_id_foreign" foreign key ("user_id_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "workout" drop column "user_id";');
    this.addSql('alter table "workout" drop column "sets";');
    this.addSql('alter table "workout" drop column "reps";');
  }

}
