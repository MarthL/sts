import { Module } from '@nestjs/common';
import { Clients } from './clients.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Clients])],
  providers: [ClientsService],
  controllers: [ClientsController],
  exports: [ClientsService, TypeOrmModule.forFeature([Clients])],
})
export class ClientsModule {}