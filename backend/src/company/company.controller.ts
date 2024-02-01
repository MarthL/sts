import { ApiTags } from '@nestjs/swagger';
import { HttpException, UnauthorizedException, ParseIntPipe  } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';

import { CompanyService } from './company.service';

import { CompanyResponseDto } from 'src/DTO/Company/companyResponse.dto';
import { CreateCompanyDto } from 'src/DTO/Company/createCompany.dto';

import { DeleteResult } from 'typeorm';


@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companyService: CompanyService,
  ) {}

  // GetAll
  @Get('')
  async getCompany() {
    return this.companyService.getAllcompany();
  }

  // GetById
  @Get(':id')
  async getCompanyById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CompanyResponseDto | HttpException> {
    return this.companyService.getCompanyById(id);
  }

  // Delete by id
  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number)
    : Promise<DeleteResult> {
    return this.companyService.deleteById(id);
  }

  // create a Company
  @Post('')
  async create(@Body() company: CreateCompanyDto): Promise<CreateCompanyDto> {
    return this.companyService.post(company);
  }

}
