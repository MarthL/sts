import { validate } from 'class-validator';
import { UserLoginDto } from './user-loginDto.dto';

describe('UserLoginDto', () => {
    it('should pass validation when all properties are present', async () => {
        const dto = new UserLoginDto();
        dto.username = 'Test username';
        dto.password = 'This is a test for password';
        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should fail validation when username is missing', async () => {
        const dto = new UserLoginDto();
        dto.password = 'This is a test for password';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail validation when password is missing', async () => {
        const dto = new UserLoginDto();
        dto.username = 'Test username';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });
});
