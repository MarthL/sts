import { Repository } from "typeorm";
import { Citys } from "./citys.entity";
import { CitysResponseDto } from "./dto/citysResponse.dto";
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

describe('cityEntity', () => {
    let cityRepository: Repository<Citys>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(Citys),
                    useClass: Repository,
                },
            ],
        }).compile();

        cityRepository = module.get<Repository<Citys>>(getRepositoryToken(Citys));
    });

    it('should define city', async () => {
        const city = new Citys();
        expect(city).toBeDefined();
    });

    it('Validating all property', async () => {
        const city = new Citys();
        city.id = 1;
        city.city_name = 'This is a test name for city name';
        city.zip_code = 'This is a test for zip code 65156';
        city.state = 'This is a test for state France';
        const checkDto = plainToClass(CitysResponseDto, city);
        const errors = validate(checkDto);
        expect((await errors).length).toBe(0);
    });

    it('should display an error when do not have any id', async () => {
        const city = new Citys();
        city.city_name = 'This is a test name for city name';
        city.zip_code = 'This is a test for zip code 65156';
        city.state = 'This is a test for state France';
        const checkDto = plainToClass(CitysResponseDto, city);
        const errors = validate(checkDto);
        expect((await errors).length).toBeGreaterThan(0);
    });

    it('should display an error when do not have any city name', async () => {
        const city = new Citys();
        city.id = 1;
        city.zip_code = 'This is a test for zip code 65156';
        city.state = 'This is a test for state France';
        const checkDto = plainToClass(CitysResponseDto, city);
        const errors = validate(checkDto);
        expect((await errors).length).toBeGreaterThan(0);
    });

    it('should display an error when do not have any zip code', async () => {
        const city = new Citys();
        city.id = 1;
        city.city_name = 'This is a test name for city name';
        city.state = 'This is a test for state France';
        const checkDto = plainToClass(CitysResponseDto, city);
        const errors = validate(checkDto);
        expect((await errors).length).toBeGreaterThan(0);
    });

    it('should display an error when do not have any state', async () => {
        const city = new Citys();
        city.id = 1;
        city.city_name = 'This is a test name for city name';
        city.zip_code = 'This is a test for zip code 65156';
        const checkDto = plainToClass(CitysResponseDto, city);
        const errors = validate(checkDto);
        expect((await errors).length).toBeGreaterThan(0);
    });
})