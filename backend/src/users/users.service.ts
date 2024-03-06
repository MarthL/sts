import {
  Injectable,
  HttpException,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from '../DTO/User/create-userDto.dto';
import { UserResponseDto } from 'src/DTO/User/userResponseDto.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  // getAll()
  async getAllusers(search?: string): Promise<Users[]> {
    const userCollection = await this.userRepository.find({
      select: {
        id: true,
        username: true,
        password: true,
      },
      where: {
        username: search,
      },
    });

    return userCollection;
  }

  // getById
  async getUserById(userId: number): Promise<UserResponseDto | HttpException> {
    const user = await this.userRepository.findOne({
      relations: ['job', 'company', 'city', 'link'],
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return plainToClass(UserResponseDto, user);
  }

  // getAll projects of user
  async getUserProjects(userId: number) {
    const user = await this.userRepository.findOne({
      relations: ['projectsCollection'],
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user.projectsCollection;
  }

  async deleteById(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const { username, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new Users();
    user.username = username;
    user.password = hashedPassword;
    return this.userRepository.save(user);
  }

  // Warning : for auth, do not edit atm
  async checkUserExist(username: string): Promise<UserResponseDto | null> {
    return this.userRepository.findOne({
      select: {
        id: true,
        username: true,
        password: true,
        family_name: true,
      },
      where: { username: username },
    });
  }

  async getLoggedUser(username: string): Promise<UserResponseDto> {
    const loggedUser = await this.userRepository.findOne({
      where: {
        username: username,
      },
      relations: ['job', 'company', 'city', 'link'],
    });

    if (!loggedUser) {
      throw new HttpException('User not found', 404);
    }
    return plainToClass(UserResponseDto, loggedUser);
  }

  // Patch
  async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReq: UserResponseDto,
  ): Promise<any> {
    const { job_id, company_id, city_id, link_id, ...fields } = updateReq;

    let updateQuery = {};

    if (job_id !== undefined && company_id !== undefined) {
      updateQuery = {
        ...updateQuery,
        job: { id: job_id },
        company: { id: company_id },
      };
    }

    if (link_id !== undefined) {
      updateQuery = { ...updateQuery, link: { id: link_id } };
    }

    if (city_id !== undefined) {
      updateQuery = { ...updateQuery, city: { id: city_id } };
    }
    updateQuery = { ...updateQuery, ...fields };

    const result = await this.userRepository.update(id, updateQuery);

    return result;
  }
}
