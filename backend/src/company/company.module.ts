import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
  exports: [CompanyService, TypeOrmModule.forFeature([Company])],
})
export class CompanyModule {}
