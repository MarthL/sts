import { validate } from "class-validator";
import CreateClientsDto from "./createClients.dto";

describe('CreateClientsDto', () => {
    it('should fail validation when name is missing', async () => {
        const dto = new CreateClientsDto();
        dto.siret = 'This is a test for siret';
        dto.mail = 'This a test for mail';
        dto.phone = 'This a test for phone';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail validation when siret is missing', async () => {
        const dto = new CreateClientsDto();
        dto.name = 'Test name of client';
        dto.mail = 'This a test for mail';
        dto.phone = 'This a test for phone';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail validation when mail is missing', async () => {
        const dto = new CreateClientsDto();
        dto.name = 'Test name of client';
        dto.siret = 'This is a test for siret';
        dto.phone = 'This a test for phone';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail validation when phone is missing', async () => {
        const dto = new CreateClientsDto();
        dto.name = 'Test name of client';
        dto.siret = 'This is a test for siret';
        dto.mail = 'This a test for mail';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThanOrEqual(1);
    });
})