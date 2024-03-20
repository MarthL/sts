import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
<<<<<<< HEAD
  ParseIntPipe
=======
  ParseIntPipe,
  Patch,
>>>>>>> e532615818865792d86e1f360653afa343423383
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Clients } from './clients.entity';
import { ClientsService } from './clients.service';
import createClientsDto from './dto/createClients.dto';
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