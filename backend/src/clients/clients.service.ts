import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Clients } from './clients.entity';
import CreateClientsDto from '../DTO/Clients/createClients.dto';
import { plainToClass } from 'class-transformer';

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
  async post(@Body() createReq: CreateClientsDto): Promise<CreateClientsDto> {
    const newClient = plainToClass(CreateClientsDto, createReq);
    return await this.clientsRepository.save(newClient);
  }

  // deleteById
  async deleteById(id: number): Promise<DeleteResult> {
    return this.clientsRepository.delete(id);
  }
}