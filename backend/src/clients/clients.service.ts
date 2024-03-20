import { Injectable, Body, Param, ParseIntPipe, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { Clients } from './clients.entity';
import CreateClientsDto from './dto/createClients.dto';
import ClientsResponseDto from './dto/clientsResponse.dto';
import UpdateClientDto from './dto/updateClient.dto';

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

  // GetById
  async getClientById(
    id: number,
  ): Promise<ClientsResponseDto | HttpException> {
    const client = await this.clientsRepository.findOne({
      where: { id },
    });
    if (!client) {
      throw new HttpException('Client not found', 404);
    }
    return plainToClass(ClientsResponseDto, client);
  }

  // Post
  async post(@Body() createReq: any): Promise<CreateClientsDto> {
    return await this.clientsRepository.save(createReq);
  }

  // Patch
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReq: UpdateClientDto,
  ): Promise<any> {
    return this.clientsRepository.update(id, updateReq);
  }

  // deleteById
  async deleteById(id: number): Promise<DeleteResult> {
    return this.clientsRepository.delete(id);
  }
}