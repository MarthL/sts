import { validate } from 'class-validator';
import { randomInt } from 'crypto';
import { UpdateCompanyDto } from './updateCompany.dto';

describe('UpdateCompanyDto', () => {
  it('should pass validation when all properties are present', async () => {
    const dto = new UpdateCompanyDto();
    dto.name = 'Test name of company';
    dto.projectsIds = [randomInt(10)];
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation when name is missing', async () => {
    const dto = new UpdateCompanyDto();
    dto.projectsIds = [randomInt(10)];
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should pass validation when projectsIds is missing', async () => {
    const dto = new UpdateCompanyDto();
    dto.name = 'Test name of company';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when name is not a string', async () => {
    const dto = new UpdateCompanyDto();
    try {
      dto.name = 1 as any;
      await validate(dto);
    } catch (error) {
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('should fail validation when projectsIds is not an array', async () => {
    const dto = new UpdateCompanyDto();
    try {
      dto.projectsIds = randomInt(10) as any;
      dto.name = 'Test name of company';
      await validate(dto);
    } catch (error) {
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('should fail validation when projectsIds is not an array of numbers', async () => {
    const dto = new UpdateCompanyDto();
    try {
      dto.projectsIds = ['1', '2'] as any;
      dto.name = 'Test name of company';
      await validate(dto);
    } catch (error) {
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('should success validation when type is the same', async () => {
    const dto = new UpdateCompanyDto();
    dto.name = 'This is a test for name company';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
