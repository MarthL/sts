import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Body
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
  
  import { CitysService } from './citys.service';
  
  import { Citys } from './citys.entity';
import CitysResponseDto from 'src/DTO/Citys/citysResponse.dto';

  @ApiTags('Citys')
  @Controller('/citys')
  export class CitysController {
    constructor(private readonly citysService: CitysService) {}
  
    @Get()
    async getAll(): Promise<Citys[]> {
      return this.citysService.getCitys();
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
  