import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Companys } from './company.entity';
import { CompanysService } from './company.service';
import { CompanyController } from './company.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Companys]),
  ],
  controllers: [CompanyController],
  providers: [CompanysService],
  exports: [CompanysService, TypeOrmModule.forFeature([Companys])],
})
export class CompanysModule {}