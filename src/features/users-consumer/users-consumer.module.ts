import { Module } from '@nestjs/common';
import { UsersConsumerService } from './infrastructure/users-consumer.service';
import { UsersModule } from '../users/users.module';

@Module({
  exports: [UsersConsumerService],
  imports: [UsersModule],
  providers: [UsersConsumerService],
})
export class UsersConsumerModule {}
