import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Body,
  Query
} from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { CitysService } from './citys.service';
import { Citys } from './citys.entity';
import { CitysResponseDto } from './dto/citysResponse.dto';

@ApiTags('Citys')
@Controller('/citys')
export class CitysController {
  constructor(private readonly citysService: CitysService) {}

  @Get()
  @ApiQuery({ name: 'search', required: false, type: String })
  async getAll(@Query("search") search: string): Promise<Citys[]> {
    return this.citysService.getCitys(search);
  }

  @Get(':id')
  async getCityById(@Param('id', ParseIntPipe) id: number) {
    return await this.citysService.getCityById(id);
  }

  @Patch(':id')
  async updateCities(
    @Param('id') id: number,
    @Body() updateReq: CitysResponseDto,
  ): Promise<CitysResponseDto> {
    return await this.citysService.patch(id, updateReq);
  }
}