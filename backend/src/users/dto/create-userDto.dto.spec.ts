import { validate } from "class-validator";
import { CreateUserDto } from "./create-userDto.dto";

describe('CreateUserDto', () => {
    it('should pass validation when all properties are present', async () => {
        const dto = new CreateUserDto();
        dto.username = 'this is a test for username';
        dto.password = 'Test password';
        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should fail validation when username is missing', async () => {
        const dto = new CreateUserDto();
        dto.password = 'this is a test a password';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail validation when password is missing', async () => {
        const dto = new CreateUserDto();
        dto.username = 'This is a test for username'
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThanOrEqual(1);
    });

})