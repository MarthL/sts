import { Module } from '@nestjs/common';
import { Citys } from './citys.entity';
import { CitysService } from './citys.service';
import { CitysController } from './citys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Citys])],
  providers: [CitysService],
  controllers: [CitysController],
  exports: [CitysService, TypeOrmModule.forFeature([Citys])],
})
export class CitysModule {}
