import { validate } from "class-validator";
import { randomInt } from "crypto";
import { JobResponseDto } from "./jobResponseDto.dto";

describe('JobResponseDto', () => {

    it('should pass validation when all properties are present', async () => {
        const dto = new JobResponseDto();
        dto.id = randomInt(10);
        dto.job_title = 'This is a test for job title';        
        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should fail validation when ID is missing', async () => {
        const dto = new JobResponseDto();
        dto.job_title = 'This is a test for job_title';
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThanOrEqual(1);
    });

    it('should fail validation when job_title is missing', async () => {
        const dto = new JobResponseDto();
        dto.id = randomInt(10);
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThanOrEqual(1);
    });
})