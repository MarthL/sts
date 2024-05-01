import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Companys } from './company.entity';
import { CompanysService } from './company.service';
import { CompanyController } from './company.controller';

import { Projects } from '../projects/projects.entity'; // Assurez-vous que le chemin d'importation est correct

@Module({
  imports: [TypeOrmModule.forFeature([Companys, Projects])],
  controllers: [CompanyController],
  providers: [CompanysService],
  exports: [CompanysService, TypeOrmModule.forFeature([Companys])],
})
export class CompanysModule {}
