import { validate } from "class-validator";
import { randomInt } from "crypto";
import { CreateJobDto } from "./createJobDto.dto";

describe('CreateJobDto', () => {

    it('should pass validation when all properties are present', async () => {
        const dto = new CreateJobDto();
        dto.job_title = 'This is a test for job title';
        dto.job_field = randomInt(10);
        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });
    it('should fail validation when job_title is missing', async () => {
        const dto = new CreateJobDto();
        dto.job_field = randomInt(10);
        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThanOrEqual(1);
    });
})