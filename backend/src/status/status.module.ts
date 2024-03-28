import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { Status } from './status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Status])
  ],
  controllers: [StatusController],
  providers: [StatusService],
  exports: [StatusService, TypeOrmModule.forFeature([Status])],
})
export class StatusModule {}