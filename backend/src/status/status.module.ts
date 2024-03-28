import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { Status } from './status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusSeederService } from './status-seeder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Status]),
    TypeOrmModule.forRootAsync({
      useFactory: async (statusSeederService: StatusSeederService) => {
        return await statusSeederService.seedInitialData();
      },
      inject: [StatusSeederService],
    }),
  ],
  controllers: [StatusController],
  providers: [StatusService, StatusSeederService],
  exports: [StatusService, TypeOrmModule.forFeature([Status])],
})
export class StatusModule {}