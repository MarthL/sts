import {
    Injectable,
    HttpException,
    Body,
  } from '@nestjs/common';

  import { plainToClass } from 'class-transformer';

  import { InjectRepository } from '@nestjs/typeorm';
  import { DeleteResult, Repository } from 'typeorm';

  import { Company } from './company.entity';

  import { CompanyResponseDto } from 'src/DTO/Company/companyResponse.dto';
  import { CreateCompanyDto } from 'src/DTO/Company/createCompany.dto';
  
  @Injectable()
  export class CompanyService {
    constructor(
      @InjectRepository(Company)
      private companyRepository: Repository<Company>,
    ) {}
  
    // getAll()
    async getAllcompany(): Promise<Company[]> {
      const companyCollection = await this.companyRepository.find({
        select: {
          id: true,
          name: true
        },
      });
  
      return companyCollection;
    }
  
    // getById
    async getCompanyById(id: number): Promise<CompanyResponseDto | HttpException> {
      return await this.companyRepository.findOne({
        where: {
          id: id,
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
  
    // Warning : for auth, do not edit atm
    async checkCompanyExist(name: string): Promise<CompanyResponseDto | null> {
      return this.companyRepository.findOne({
        select: {
          id: true,
          name: true
        },
        where: { name },
      });
    }
  
    
  }
  