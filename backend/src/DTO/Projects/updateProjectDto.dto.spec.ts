import { validate } from 'class-validator';
import { UpdateProjectDto } from './updateProjectDto.dto';
import { randomInt } from 'crypto';

describe('UpdateProjectDto', () => {
  it('should pass validation when all properties are present', async () => {
    const dto = new UpdateProjectDto();
    dto.id = randomInt(10);
    dto.project_name = 'Test Project';
    dto.description = 'This is a test project';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when project_name is missing', async () => {
    const dto = new UpdateProjectDto();
    dto.id = randomInt(10);
    dto.description = 'This is a test project';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation when description is missing', async () => {
    const dto = new UpdateProjectDto();
    dto.id = randomInt(10);
    dto.project_name = 'Test Project';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation when ID is missing', async () => {
    const dto = new UpdateProjectDto();
    dto.description = 'This is a test project';
    dto.project_name = 'Test Project';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
