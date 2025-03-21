import { Module } from '@nestjs/common';
import { SitesConsumerService } from './infrastructure/sites-consumer.service';
import { SitesModule } from '../sites/sites.module';

@Module({
  exports: [SitesConsumerService],
  imports: [SitesModule],
  providers: [SitesConsumerService],
})
export class SitesConsumerModule {}
