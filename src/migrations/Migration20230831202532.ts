import { Migration } from '@mikro-orm/migrations';

export class Migration20230831202532 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "workout" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "exercise" varchar(255) not null, "user_id_id" int not null, "deleted_on" varchar(255) null);');

    this.addSql('alter table "workout" add constraint "workout_user_id_id_foreign" foreign key ("user_id_id") references "user" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "workout" cascade;');
  }

}
