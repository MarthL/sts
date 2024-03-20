import {
  Injectable,
  Body,
  Param,
  HttpException,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Links } from './links.entity';
import { createLinkDto } from '../DTO/Links/createLink.dto';
import { updateLinkDto } from '../DTO/Links/updateLink.dto';
import { LinksResponseDto } from '../DTO/Links/linkResponse.dto';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Links)
    private linksRepository: Repository<Links>,
  ) {}

  // Post Link
  async post(@Body() createReq: createLinkDto): Promise<createLinkDto> {
    const newLink = plainToClass(createLinkDto, createReq);
    return await this.linksRepository.save(newLink);
  }

  // GetAll Links
  async getLinks(search?: any): Promise<Links[]> {
    if (!search) {
      return this.linksRepository.find({ take: 5 });
    }
    return await this.linksRepository.find({
      take: 5,
      where: {
        url: Like(`${search}%`),
      },
    });
  }

  // GetById Link
  async getLinkById(id: number): Promise<LinksResponseDto | HttpException> {
    const link = await this.linksRepository.findOne({
      where: { id },
    });
    if (!link) {
      throw new HttpException('Link not found', 404);
    }
    return plainToClass(LinksResponseDto, link);
  }

  // Patch Links
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReq: updateLinkDto,
  ): Promise<any> {
    return this.linksRepository.update(id, updateReq);
  }

  // Delete Link
  async deleteById(id: number): Promise<any> {
    return this.linksRepository.delete(id);
  }
}
