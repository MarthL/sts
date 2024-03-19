import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  ParseIntPipe
} from '@nestjs/common';
import { CompanysService } from './company.service';
import { CompanyResponseDto } from 'src/companys/dto/companyResponse.dto';
import { CreateCompanyDto } from 'src/companys/dto/createCompany.dto';
import { DeleteResult } from 'typeorm';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(
    private readonly companysService: CompanysService,
  ) {}

  // GetAll
  @Get('')
  async getCompanys() {
    return this.companysService.getAllcompanys();
  }

  // GetById
  @Get(':id')
  async getCompanyById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CompanyResponseDto | HttpException> {
    return this.companysService.getCompanyById(id);
  }

  // Delete by id
  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number)
    : Promise<DeleteResult> {
    return this.companysService.deleteById(id);
  }

  // create a Company
  @Post('')
  async create(@Body() company: CreateCompanyDto): Promise<CreateCompanyDto> {
    return this.companysService.post(company);
  }

}
