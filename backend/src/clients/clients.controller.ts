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
import createClientsDto from 'src/DTO/Clients/createClients.dto';
import { DeleteClientDto } from 'src/DTO/Clients/deleteClientDto.dto';
@ApiTags('Clients')
@Controller('/clients')

export class ClientsController{
    constructor(private readonly clientsService: ClientsService){}

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
  ): Promise<DeleteClientDto> {
    return this.clientsService.deleteById(id);
  }
}