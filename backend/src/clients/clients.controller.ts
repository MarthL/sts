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
import { DeleteResult } from 'typeorm';
import  updateClientDto  from './dto/updateClient.dto';

@ApiTags('Clients')
@Controller('/clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  // Get
  @Get()
  async getAll(): Promise<Clients[]> {
    return this.clientsService.getClients();
  }

  // Get by Id
  @Get(':id')
  async getClientById(@Param('id', ParseIntPipe) id: number) {
    return await this.clientsService.getClientById(id);
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
    @Body() updateReq: updateClientDto,
  ): Promise<updateClientDto> {
    return await this.clientsService.patch(id, updateReq);
  }

  // Delete
  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return this.clientsService.deleteById(id);
  }
}