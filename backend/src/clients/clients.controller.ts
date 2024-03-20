import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  ParseIntPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Clients } from './clients.entity';
import { ClientsService } from './clients.service';
import createClientsDto from './dto/createClients.dto';
import ClientsResponseDto from './dto/clientsResponse.dto';
import { DeleteResult } from 'typeorm';

@ApiTags('Clients')
@Controller('/clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  // Get
  @Get()
  async getAll(): Promise<Clients[]> {
    return this.clientsService.getClients();
  }

  // Post
  @Post('')
  async create(@Body() client: createClientsDto): Promise<createClientsDto> {
    return this.clientsService.post(client);
  }

  // Patch
  @Patch(':id')
  async updateClient(
    @Param('id') id: number,
    @Body() updateReq: ClientsResponseDto,
  ): Promise<ClientsResponseDto> {
    return await this.clientsService.patch(id, updateReq);
  }

  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return this.clientsService.deleteById(id);
  }
}