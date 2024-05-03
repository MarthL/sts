import { validate } from 'class-validator';
import { randomInt } from 'crypto';
import { CompanyResponseDto } from './companyResponse.dto';

describe('CompanyResponseDto', () => {
  it('should pass validation when all properties are present', async () => {
    const dto = new CompanyResponseDto();
    dto.id = randomInt(10);
    dto.name = 'Test name of company';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when ID is missing', async () => {
    const dto = new CompanyResponseDto();
    dto.name = 'Test name of company';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThanOrEqual(1);
  });

  it('should fail validation when ID is not a number', async () => {
    const dto = new CompanyResponseDto();
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
    dto.name = 'Test name of company';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThanOrEqual(1);
  });

  it('should success validation when type is the same', async () => {
    const dto = new CompanyResponseDto();
    dto.name = 'This is a test for name company';
    const errors = await validate(dto);
    expect.stringContaining(dto.name);
  });
});
