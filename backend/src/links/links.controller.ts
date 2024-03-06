import { ApiTags, ApiQuery } from '@nestjs/swagger';
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Patch,
    ParseIntPipe
} from '@nestjs/common';
import { Links } from './links.entity';
import { LinksService } from './links.service';
import { createLinkDto } from '../DTO/Links/createLink.dto';
import { LinksResponseDto } from '../DTO/Links/linkResponse.dto';
import { updateLinkDto } from '../DTO/Links/updateLink.dto';

@ApiTags('Links')
@Controller('/links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Get()
  @ApiQuery({ name: 'search', required: false, type: String })
  async getAll(): Promise<Links[]> {
    return this.linksService.getLinks();
  }

  @Get(':id')
  async getLinkById(@Param('id', ParseIntPipe) id: number) {
    return await this.linksService.getLinkById(id);
  }

  @Post('')
  async create(@Body() link: createLinkDto): Promise<createLinkDto> {
    return this.linksService.post(link);
  }

  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<LinksResponseDto> {
    return this.linksService.deleteById(id);
  }

  @Patch(':id')
  async updateLink(
    @Param('id') id: number,
    @Body() updateReq: updateLinkDto,
  ): Promise<updateLinkDto> {
    return await this.linksService.patch(id, updateReq);
  }
}