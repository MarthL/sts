import { Repository } from "typeorm";
import { Companys } from "./company.entity";
import { CompanyResponseDto } from "../DTO/Company/companyResponse.dto";
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

describe('companyEntity', () => {
    let companyRepository: Repository<Companys>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(Companys),
                    useClass: Repository,
                },
            ],
        }).compile();

        companyRepository = module.get<Repository<Companys>>(getRepositoryToken(Companys));
    });

    it('should define company', async () => {
        const company = new Companys();
        expect(company).toBeDefined();
    });

    it('Validating all property', async () => {
        const company = new Companys();
        company.id = 1;
        company.name = 'This is a test for client name =  Hina';
        const checkDto = plainToClass(CompanyResponseDto, company);
        const errors = validate(checkDto);
        expect((await errors).length).toBe(0);
    });

    it('should display an error when do not have any id', async () => {
        const company = new Companys();
        company.name = 'This is a test for client name =  Hina';
        const checkDto = plainToClass(CompanyResponseDto, company);
        const errors = validate(checkDto);
        expect((await errors).length).toBeGreaterThan(0);
    });

    it('should display an error when do not have any name', async () => {
        const company = new Companys();
        company.id = 1;
        const checkDto = plainToClass(CompanyResponseDto, company);
        const errors = validate(checkDto);
        expect((await errors).length).toBeGreaterThan(0);
    });

})