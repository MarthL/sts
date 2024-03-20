import { validate } from 'class-validator';
import createProjectDto from './createProject.dto';

describe('createProjectDto', () => {
  it('should pass validation when all properties are present', async () => {
    const dto = new createProjectDto();
    dto.project_name = 'Test Project';
    dto.description = 'This is a test project';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when project_name is missing', async () => {
    const dto = new createProjectDto();
    dto.description = 'This is a test project';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation when description is missing', async () => {
    const dto = new createProjectDto();
    dto.project_name = 'Test Project';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
