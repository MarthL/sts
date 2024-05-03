import { validate } from 'class-validator';
import ProjectsResponseDto from './projectsResponse.dto';
import { randomInt } from 'crypto';
import { Projects } from '../projects.entity';

describe('ProjectsResponseDto', () => {
  it('should pass validation when all properties are present', async () => {
    const dto = new ProjectsResponseDto();
    dto.id = randomInt(10);
    dto.project_name = 'Test Project';
    dto.description = 'This is a test project';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when project_name is missing', async () => {
    const dto = new ProjectsResponseDto();
    dto.id = randomInt(10);
    dto.description = 'This is a test project';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation when description is missing', async () => {
    const dto = new ProjectsResponseDto();
    dto.id = randomInt(10);
    dto.project_name = 'Test Project';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation when ID is missing', async () => {
    const dto = new ProjectsResponseDto();
    dto.description = 'This is a test project';
    dto.project_name = 'Test Project';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation when ID is not a number', async () => {
    const dto = new ProjectsResponseDto();
    Object.defineProperty(dto, 'id', {
      get: function () {
        return this._id + '';
      },
      set: function (value) {
        this._id = value;
      },
      enumerable: true,
      configurable: true,
    });
    dto.id = 1;
    dto.description = 'This is a test project';
    dto.project_name = 'Test Project';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
