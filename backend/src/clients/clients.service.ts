import {
    Injectable,
    Body,
    Param,
    HttpException,
    ParseIntPipe,
  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from './clients.entity';
import createClientsDto from 'src/DTO/Clients/createClients.dto';
import { DeleteClientDto } from 'src/DTO/Clients/deleteClientDto.dto';
import { plainToClass } from 'class-transformer';


@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Clients)
        private clientsRepository: Repository<Clients>,
    ){}

    // GetAll
    async getClients(): Promise<Clients[]> {
    return await this.clientsRepository.find();
  }

  /////////////////////////
  // GetById
  /////////////////////////

  // Post
  async post(@Body() createReq: createClientsDto): Promise<createClientsDto> {
    const newClient = plainToClass(createClientsDto, createReq);
    return await this.clientsRepository.save(newClient);
  }

  //////////////////////////
  // Patch
 ///////////////////////////

  async deleteById(id: number): Promise<DeleteClientDto> {
    return this.clientsRepository.delete(id);
  }
}