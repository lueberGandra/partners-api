import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { PrismaModule } from './prisma/prisma.module';
import { SpotModule } from './spot/spot.module';

@Module({
  imports: [EventsModule, PrismaModule, SpotModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
