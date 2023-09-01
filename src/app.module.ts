import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import UserModule from './user/User.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import WorkoutModule from './workout/workout.module';

@Module({
  imports: [UserModule, WorkoutModule, MikroOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
