import { validate } from "class-validator";
import ClientsResponseDto from "./clientsResponse.dto";
import { randomInt } from "crypto";

describe('ClientsResponseDto', () => {
    it('should pass validation when all properties are present', async () => {
        const dto = new ClientsResponseDto();
        dto.id = randomInt(10);
        dto.name = 'Test name of client';
        dto.siret = 'This is a test for siret';
        dto.industry = 'This is a test for industry';
        dto.mail = 'This a test for mail';
        dto.phone = 'This a test for phone';
        dto.address = 'This a test for adress';
        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should fail validation when ID is missing', async () => {
        const dto = new ClientsResponseDto();
        dto.name = 'Test name of client';
        dto.siret = 'This is a test for siret';
        dto.mail = 'This a test for mail';
        dto.phone = 'This a test for phone';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail validation when ID is not a number', async () => {
        let dto = new ClientsResponseDto();
        Object.defineProperty(dto, 'id', {
            get: function() {
              return this._id + '';
            },
            set: function(value) {
              this._id = value;
            },
            enumerable: true,
            configurable: true
          });
        dto.id = 1;
        dto.name = 'Test name of client';
        dto.siret = 'This is a test for siret';
        dto.mail = 'This a test for mail';
        dto.phone = 'This a test for phone';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail validation when name is missing', async () => {
        const dto = new ClientsResponseDto();
        dto.id = randomInt(10);
        dto.siret = 'This is a test for siret';
        dto.mail = 'This a test for mail';
        dto.phone = 'This a test for phone';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail validation when siret is missing', async () => {
        const dto = new ClientsResponseDto();
        dto.id = randomInt(10);
        dto.name = 'Test name of client';
        dto.mail = 'This a test for mail';
        dto.phone = 'This a test for phone';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail validation when mail is missing', async () => {
        const dto = new ClientsResponseDto();
        dto.id = randomInt(10);
        dto.name = 'Test name of client';
        dto.siret = 'This is a test for siret';
        dto.phone = 'This a test for phone';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail validation when phone is missing', async () => {
        const dto = new ClientsResponseDto();
        dto.id = randomInt(10);
        dto.name = 'Test name of client';
        dto.siret = 'This is a test for siret';
        dto.mail = 'This a test for mail';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThanOrEqual(1);
    });
})