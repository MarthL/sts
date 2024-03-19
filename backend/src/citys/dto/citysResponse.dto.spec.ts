import { validate } from 'class-validator';
import { CitysResponseDto } from './citysResponse.dto';
import { randomInt } from 'crypto';

describe('CitysResponseDto', () => {
  it('should pass validation when all properties are present', async () => {
    const dto = new CitysResponseDto();
    dto.id = randomInt(10);
    dto.city_name = 'Test name of city';
    dto.zip_code = 'This is a test for zip-code';
    dto.state = 'This is a test for state';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when ID is missing', async () => {
    const dto = new CitysResponseDto();
    dto.city_name = 'Test name of city';
    dto.zip_code = 'This is a test for zip-code';
    dto.state = 'This is a test for state';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation when city_name is missing', async () => {
    const dto = new CitysResponseDto();
    dto.id = randomInt(10);
    dto.zip_code = 'This is a test for zip-code';
    dto.state = 'This is a test for state';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation when zip_code is missing', async () => {
    const dto = new CitysResponseDto();
    dto.id = randomInt(10);
    dto.city_name = 'Test name of city';
    dto.state = 'This is a test for state';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation when state is missing', async () => {
    const dto = new CitysResponseDto();
    dto.id = randomInt(10);
    dto.city_name = 'Test name of city';
    dto.zip_code = 'This is a test for zip-code';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should fail validation when ID is not a number', async () => {
    const dto = new CitysResponseDto();
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
    dto.city_name = 'Test name of city';
    dto.zip_code = 'This is a test for zip-code';
    dto.state = 'This is a test for state';
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});