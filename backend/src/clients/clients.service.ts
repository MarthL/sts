import { Injectable, Body, Param, ParseIntPipe, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Clients } from './clients.entity';
import CreateClientsDto from './dto/createClients.dto';
import ClientsResponseDto from './dto/clientsResponse.dto';
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
  // async patch(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() updateReq: ClientsResponseDto,
  // ): Promise<any> {
  //   return this.clientsRepository.update(id, updateReq);
  // }
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReq: ClientsResponseDto,
  ): Promise<ClientsResponseDto> {
      // Construction de la requête de mise à jour
      await this.clientsRepository.createQueryBuilder()
          .update(Clients)
          .set(updateReq)
          .where("id = :id", { id: id })
          .execute();

      // Récupération de l'entité mise à jour
      const updatedClient = await this.clientsRepository.createQueryBuilder("clients")
          .where("clients.id = :id", { id: id })
          .getOne();

      if (!updatedClient) {
          // Gérer le cas où l'entité mise à jour n'est pas trouvée
          throw new Error(`Impossible de trouver le client avec l'ID ${id}`);
      }

      return updatedClient; // Retourner l'entité mise à jour
  }

  // deleteById
  async deleteById(id: number): Promise<DeleteResult> {
    return this.clientsRepository.delete(id);
  }
}