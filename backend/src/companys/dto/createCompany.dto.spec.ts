import { validate } from "class-validator";
import { CreateCompanyDto } from "./createCompany.dto";

describe('CreateCompanyDto', () => {
    it('should fail validation when name is missing', async () => {
        const dto = new CreateCompanyDto();
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThanOrEqual(1);
    });

    it('should success validation when name is the same', async () => {
        const dto = new CreateCompanyDto();
        dto.name = 'This is a test for name';
        const errors = await validate(dto);
        expect.stringContaining(dto.name);
    });
})