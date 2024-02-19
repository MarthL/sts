import { validate } from 'class-validator';
import { UserResponseDto } from './userResponseDto.dto';
import { randomInt } from 'crypto';

describe('UserResponseDto', () => {
    it('should pass validation when all properties are present', async () => {
        const dto = new UserResponseDto();
        dto.id = randomInt(10);
        dto.username = 'Test username';
        dto.password = 'This is a test for password';
        dto.family_name = 'This is a test for family name';
        dto.job_id = randomInt(4);
        dto.address = 'This is a test for address';
        dto.phone_number = 'This is a test for phone number';
        dto.city_id = randomInt(10);
        dto.email = 'This is a test for email';
        dto.company_id = randomInt(1);
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail validation when ID is missing', async () => {
        const dto = new UserResponseDto();
        dto.username = 'Test username';
        dto.password = 'This is a test for password';
        dto.family_name = 'This is a test for family name';
        dto.job_id = randomInt(4);
        dto.address = 'This is a test for adress';
        dto.phone_number = 'This is a test for phone number';
        dto.city_id = randomInt(10);
        dto.email = 'This is a test for email';
        dto.company_id = randomInt(1);
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail validation when username is missing', async () => {
        const dto = new UserResponseDto();
        dto.id = randomInt(10);
        dto.password = 'This is a test for password';
        dto.family_name = 'This is a test for family name';
        dto.job_id = randomInt(4);
        dto.address = 'This is a test for adress';
        dto.phone_number = 'This is a test for phone number';
        dto.city_id = randomInt(10);
        dto.email = 'This is a test for email';
        dto.company_id = randomInt(1);
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail validation when password is missing', async () => {
        const dto = new UserResponseDto();
        dto.id = randomInt(10);
        dto.username = 'Test username';
        dto.family_name = 'This is a test for family name';
        dto.job_id = randomInt(4);
        dto.address = 'This is a test for adress';
        dto.phone_number = 'This is a test for phone number';
        dto.city_id = randomInt(10);
        dto.email = 'This is a test for email';
        dto.company_id = randomInt(1);
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail validation when family name is missing', async () => {
        const dto = new UserResponseDto();
        dto.id = randomInt(10);
        dto.username = 'Test username';
        dto.password = 'This is a test for password';
        dto.job_id = randomInt(4);
        dto.address = 'This is a test for adress';
        dto.phone_number = 'This is a test for phone number';
        dto.city_id = randomInt(10);
        dto.email = 'This is a test for email';
        dto.company_id = randomInt(1);
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail validation when job_ID is missing', async () => {
        const dto = new UserResponseDto();
        dto.id = randomInt(10);
        dto.username = 'Test username';
        dto.password = 'This is a test for password';
        dto.family_name = 'This is a test for family name';
        dto.address = 'This is a test for adress';
        dto.phone_number = 'This is a test for phone number';
        dto.city_id = randomInt(10);
        dto.email = 'This is a test for email';
        dto.company_id = randomInt(1);
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail validation when address is missing', async () => {
        const dto = new UserResponseDto();
        dto.id = randomInt(10);
        dto.username = 'Test username';
        dto.password = 'This is a test for password';
        dto.family_name = 'This is a test for family name';
        dto.job_id = randomInt(4);
        dto.phone_number = 'This is a test for phone number';
        dto.city_id = randomInt(10);
        dto.email = 'This is a test for email';
        dto.company_id = randomInt(1);
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail validation when phone number is missing', async () => {
        const dto = new UserResponseDto();
        dto.id = randomInt(10);
        dto.username = 'Test username';
        dto.password = 'This is a test for password';
        dto.family_name = 'This is a test for family name';
        dto.job_id = randomInt(4);
        dto.address = 'This is a test for adress';
        dto.city_id = randomInt(10);
        dto.email = 'This is a test for email';
        dto.company_id = randomInt(1);
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail validation when city_ID is missing', async () => {
        const dto = new UserResponseDto();
        dto.id = randomInt(10);
        dto.username = 'Test username';
        dto.password = 'This is a test for password';
        dto.family_name = 'This is a test for family name';
        dto.job_id = randomInt(4);
        dto.address = 'This is a test for adress';
        dto.phone_number = 'This is a test for phone number';
        dto.email = 'This is a test for email';
        dto.company_id = randomInt(1);
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail validation when email is missing', async () => {
        const dto = new UserResponseDto();
        dto.id = randomInt(10);
        dto.username = 'Test username';
        dto.password = 'This is a test for password';
        dto.family_name = 'This is a test for family name';
        dto.job_id = randomInt(4);
        dto.address = 'This is a test for adress';
        dto.phone_number = 'This is a test for phone number';
        dto.city_id = randomInt(10);
        dto.company_id = randomInt(1);
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail validation when company_ID is missing', async () => {
        const dto = new UserResponseDto();
        dto.id = randomInt(10);
        dto.username = 'Test username';
        dto.password = 'This is a test for password';
        dto.family_name = 'This is a test for family name';
        dto.job_id = randomInt(4);
        dto.address = 'This is a test for adress';
        dto.phone_number = 'This is a test for phone number';
        dto.city_id = randomInt(10);
        dto.email = 'This is a test for email';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });
});
