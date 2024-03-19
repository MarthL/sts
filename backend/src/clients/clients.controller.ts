import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  ParseIntPipe,
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

  @Get()
  async getAll(): Promise<Clients[]> {
    return this.clientsService.getClients();
  }

  @Post('')
  async create(@Body() client: createClientsDto): Promise<createClientsDto> {
    return this.clientsService.post(client);
  }

  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return this.clientsService.deleteById(id);
  }
}