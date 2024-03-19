import {
    Injectable,
    HttpException,
    Body,
  } from '@nestjs/common';
  import { plainToClass } from 'class-transformer';
  import { InjectRepository } from '@nestjs/typeorm';
  import { DeleteResult, Repository } from 'typeorm';
  import { Companys } from './company.entity';
  import { CompanyResponseDto } from 'src/companys/dto/companyResponse.dto';
  import { CreateCompanyDto } from 'src/companys/dto/createCompany.dto';
  
  @Injectable()
  export class CompanysService {
    constructor(
      @InjectRepository(Companys)
      private companyRepository: Repository<Companys>,
    ) {}
  
    // getAll()
    async getAllcompanys(): Promise<Companys[]> {
      const companyCollection = await this.companyRepository.find({
        select: {
          id: true,
          name: true
        },
      });
  
      return companyCollection;
    }
  
    // getById
    async getCompanyById(companyId: number): Promise<CompanyResponseDto | HttpException> {
      return await this.companyRepository.findOne({
        where: {
          id: companyId,
        },
      });
    }
  
    //deleteById
    async deleteById(id: number): Promise<DeleteResult> {
      return this.companyRepository.delete(id);
    }
  
    // createCompany
    async post(@Body() createReq: CreateCompanyDto): Promise<CreateCompanyDto> {
      const newCompany = plainToClass(CreateCompanyDto, createReq);
      return await this.companyRepository.save(newCompany);
    }
    
  }