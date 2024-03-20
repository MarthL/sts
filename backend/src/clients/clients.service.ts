import { Injectable, Body, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Clients } from './clients.entity';
import CreateClientsDto from './dto/createClients.dto';
import ClientsResponseDto from './dto/clientsResponse.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients)
    private clientsRepository: Repository<Clients>,
  ) {}

  // GetAll
  async getClients(): Promise<Clients[]> {
    return await this.clientsRepository.find();
  }

  // Post
  async post(@Body() createReq: any): Promise<CreateClientsDto> {
    return await this.clientsRepository.save(createReq);
  }

  // Patch
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReq: ClientsResponseDto,
  ): Promise<any> {
    return this.clientsRepository.update(id, updateReq);
  }

  // deleteById
  async deleteById(id: number): Promise<DeleteResult> {
    return this.clientsRepository.delete(id);
  }
}