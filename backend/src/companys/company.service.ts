import { Injectable, HttpException, Body, HttpStatus } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { Companys } from './company.entity';
import { CompanyResponseDto } from '../companys/dto/companyResponse.dto';
import { CreateCompanyDto } from '../companys/dto/createCompany.dto';
import { UpdateCompanyDto } from './dto/updateCompany.dto';
import { Projects } from '../projects/projects.entity';

@Injectable()
export class CompanysService {
  constructor(
    @InjectRepository(Companys)
    private companyRepository: Repository<Companys>,
    @InjectRepository(Projects)
    private projectRepository: Repository<Projects>,
  ) {}

  // getAll()
  async getAllcompanys(): Promise<Companys[]> {
    const companyCollection = await this.companyRepository.find({
      select: {
        id: true,
        name: true,
        projects: true,
      },
    });

    return companyCollection;
  }

  // getById
  async getCompanyById(
    companyId: number,
  ): Promise<CompanyResponseDto | HttpException> {
    const company = await this.companyRepository.findOne({
      where: {
        id: companyId,
      },
      relations: ['projects'],
    });

    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }

    const companyResponse = plainToClass(CompanyResponseDto, company);

    return companyResponse;
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

  // updateCompany
  async update(id: number, company: UpdateCompanyDto): Promise<Companys> {
    const { projectsIds, ...updateData } = company;

    const companyToUpdate = await this.companyRepository.findOne({
      where: { id },
      relations: ['projects'],
    });

    if (projectsIds) {
      const projects = await this.projectRepository.find({
        where: {
          id: In(projectsIds),
        },
      });
      companyToUpdate.projects = projects;
    }

    Object.assign(companyToUpdate, updateData);

    return this.companyRepository.save(companyToUpdate);
  }
}
