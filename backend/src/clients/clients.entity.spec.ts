import { Repository } from "typeorm";
import { Clients } from "./clients.entity";
import ClientsResponseDto from "./dto/clientsResponse.dto";
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

describe('clientEntity', () => {
    let clientRepository: Repository<Clients>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(Clients),
                    useClass: Repository,
                },
            ],
        }).compile();

        clientRepository = module.get<Repository<Clients>>(getRepositoryToken(Clients));
    });

    it('should define client', async () => {
        const client = new Clients();
        expect(client).toBeDefined();
    });

    it('Validating all property', async () => {
        const client = new Clients();
        client.id = 1;
        client.name = 'This is a test for client name =  Hina';
        client.siret = 'This is a test for client siret = 949 372 445 00013';
        client.industry = 'This is a test for client industry = Cross guild';
        client.mail = 'This is a test for client mail = jesaispas@quelleadressmail.com';
        client.phone = 'This is a test for client phone = 0565684154';
        client.adress = 'This is a test for client address = 94 rue du jambon';
        //client.city= 'This is a test for client city = Arcachon';
        const checkDto = plainToClass(ClientsResponseDto, client);
        const errors = validate(checkDto);
        expect((await errors).length).toBe(0);
    });

    it('should display an error when do not have any id', async () => {
        const client = new Clients();
        client.name = 'This is a test for client name =  Hina';
        client.siret = 'This is a test for client siret = 949 372 445 00013';
        client.industry = 'This is a test for client industry = Cross guild';
        client.mail = 'This is a test for client mail = jesaispas@quelleadressmail.com';
        client.phone = 'This is a test for client phone = 0565684154';
        client.adress = 'This is a test for client address = 94 rue du jambon';
        //client.city= 'This is a test for client city = Arcachon';
        const checkDto = plainToClass(ClientsResponseDto, client);
        const errors = validate(checkDto);
        expect((await errors).length).toBeGreaterThan(0);
    });

    it('should display an error when do not have any name', async () => {
        const client = new Clients();
        client.id = 1;
        client.siret = 'This is a test for client siret = 949 372 445 00013';
        client.industry = 'This is a test for client industry = Cross guild';
        client.mail = 'This is a test for client mail = jesaispas@quelleadressmail.com';
        client.phone = 'This is a test for client phone = 0565684154';
        client.adress = 'This is a test for client address = 94 rue du jambon';
        //client.city= 'This is a test for client city = Arcachon';
        const checkDto = plainToClass(ClientsResponseDto, client);
        const errors = validate(checkDto);
        expect((await errors).length).toBeGreaterThan(0);
    });

    it('should display an error when do not have any siret', async () => {
        const client = new Clients();
        client.id = 1;
        client.name = 'This is a test for client name =  Hina';
        client.industry = 'This is a test for client industry = Cross guild';
        client.mail = 'This is a test for client mail = jesaispas@quelleadressmail.com';
        client.phone = 'This is a test for client phone = 0565684154';
        client.adress = 'This is a test for client address = 94 rue du jambon';
        //client.city= 'This is a test for client city = Arcachon';
        const checkDto = plainToClass(ClientsResponseDto, client);
        const errors = validate(checkDto);
        expect((await errors).length).toBeGreaterThan(0);
    });

    it('should display pass when do not have any industry because is optionnal', async () => {
        const client = new Clients();
        client.id = 1;
        client.name = 'This is a test for client name =  Hina';
        client.siret = 'This is a test for client siret = 949 372 445 00013';
        client.mail = 'This is a test for client mail = jesaispas@quelleadressmail.com';
        client.phone = 'This is a test for client phone = 0565684154';
        client.adress = 'This is a test for client address = 94 rue du jambon';
        //client.city= 'This is a test for client city = Arcachon';
        const checkDto = plainToClass(ClientsResponseDto, client);
        const errors = validate(checkDto);
        expect((await errors).length).toBe(0);
    });

    it('should display an error when do not have any mail', async () => {
        const client = new Clients();
        client.id = 1;
        client.name = 'This is a test for client name =  Hina';
        client.siret = 'This is a test for client siret = 949 372 445 00013';
        client.industry = 'This is a test for client industry = Cross guild';
        client.phone = 'This is a test for client phone = 0565684154';
        client.adress = 'This is a test for client address = 94 rue du jambon';
        //client.city= 'This is a test for client city = Arcachon';
        const checkDto = plainToClass(ClientsResponseDto, client);
        const errors = validate(checkDto);
        expect((await errors).length).toBeGreaterThan(0);
    });

    it('should display an error when do not have any phone', async () => {
        const client = new Clients();
        client.id = 1;
        client.name = 'This is a test for client name =  Hina';
        client.siret = 'This is a test for client siret = 949 372 445 00013';
        client.industry = 'This is a test for client industry = Cross guild';
        client.mail = 'This is a test for client mail = jesaispas@quelleadressmail.com';
        client.adress = 'This is a test for client address = 94 rue du jambon';
        //client.city= 'This is a test for client city = Arcachon';
        const checkDto = plainToClass(ClientsResponseDto, client);
        const errors = validate(checkDto);
        expect((await errors).length).toBeGreaterThan(0);
    });

    it('should display pass when do not have any adress because is optionnal', async () => {
        const client = new Clients();
        client.id = 1;
        client.name = 'This is a test for client name =  Hina';
        client.siret = 'This is a test for client siret = 949 372 445 00013';
        client.industry = 'This is a test for client industry = Cross guild';
        client.mail = 'This is a test for client mail = jesaispas@quelleadressmail.com';
        client.phone = 'This is a test for client phone = 0565684154';
        //client.city= 'This is a test for client city = Arcachon';
        const checkDto = plainToClass(ClientsResponseDto, client);
        const errors = validate(checkDto);
        expect((await errors).length).toBe(0);
    });

    it('should display pass when do not have any zip code because is optionnal', async () => {
        const client = new Clients();
        client.id = 1;
        client.name = 'This is a test for client name =  Hina';
        client.siret = 'This is a test for client siret = 949 372 445 00013';
        client.industry = 'This is a test for client industry = Cross guild';
        client.mail = 'This is a test for client mail = jesaispas@quelleadressmail.com';
        client.phone = 'This is a test for client phone = 0565684154';
        client.adress = 'This is a test for client address = 94 rue du jambon';
        //client.city= 'This is a test for client city = Arcachon';
        const checkDto = plainToClass(ClientsResponseDto, client);
        const errors = validate(checkDto);
        expect((await errors).length).toBe(0);
    });

    it('should display pass when do not have any state because is optionnal', async () => {
        const client = new Clients();
        client.id = 1;
        client.name = 'This is a test for client name =  Hina';
        client.siret = 'This is a test for client siret = 949 372 445 00013';
        client.industry = 'This is a test for client industry = Cross guild';
        client.mail = 'This is a test for client mail = jesaispas@quelleadressmail.com';
        client.phone = 'This is a test for client phone = 0565684154';
        client.adress = 'This is a test for client address = 94 rue du jambon';
        //client.city= 'This is a test for client city = Arcachon';
        const checkDto = plainToClass(ClientsResponseDto, client);
        const errors = validate(checkDto);
        expect((await errors).length).toBe(0);
    });

    it('should display pass when do not have any city because is optionnal', async () => {
        const client = new Clients();
        client.id = 1;
        client.name = 'This is a test for client name =  Hina';
        client.siret = 'This is a test for client siret = 949 372 445 00013';
        client.industry = 'This is a test for client industry = Cross guild';
        client.mail = 'This is a test for client mail = jesaispas@quelleadressmail.com';
        client.phone = 'This is a test for client phone = 0565684154';
        client.adress = 'This is a test for client address = 94 rue du jambon';
        const checkDto = plainToClass(ClientsResponseDto, client);
        const errors = validate(checkDto);
        expect((await errors).length).toBe(0);
    });

})