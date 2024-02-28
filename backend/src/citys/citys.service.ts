import {
  Injectable,
  HttpException,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Citys } from './citys.entity';
import { CitysResponseDto } from '../DTO/Citys/citysResponse.dto';
import { plainToClass } from 'class-transformer';
import { Like } from 'typeorm';

@Injectable()
export class CitysService {
  constructor(
    @InjectRepository(Citys)
    private citysRepository: Repository<Citys>,
  ) {}

  // GetAll
  async getCitys(search?: any): Promise<Citys[]> {
    console.log('search : ', await search);
    if (!search) {
      return this.citysRepository.find({ take: 10 });
    }
    return await this.citysRepository.find({
      take: 10,
      where: {
        city_name: Like(`${search}%`),
      },
    });
  }

  // GetById
  async getCityById(id: number): Promise<CitysResponseDto | HttpException> {
    const city = await this.citysRepository.findOne({
      where: { id },
    });
    if (!city) {
      throw new HttpException('City not found', 404);
    }
    return plainToClass(CitysResponseDto, city);
  }

  // Patch
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReq: CitysResponseDto,
  ): Promise<any> {
    return this.citysRepository.update(id, updateReq);
  }
}
