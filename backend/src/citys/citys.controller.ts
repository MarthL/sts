import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
  } from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
  
  import { CitysService } from './citys.service';
  
  import { Citys } from './citys.entity';

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
  }
  