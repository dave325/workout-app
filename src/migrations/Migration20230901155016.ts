import { Migration } from '@mikro-orm/migrations';

export class Migration20230901155016 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "deleted_on" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "deleted_on";');
  }

}
