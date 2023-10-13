import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from '../DTO/User/create-userDto.dto';
import { UserResponseDto } from 'src/DTO/User/userResponseDto.dto';
import { DeleteUserDto } from '../DTO/User/delete-userDto.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  // getAll()
  async getAllusers(): Promise<Users[]> {
    const userCollection = await this.userRepository.find({
      select: {
        id: true,
        username: true,
        password: true,
      },
    });

    return userCollection;
  }

  // getById
  async getUserById(userId: number): Promise<UserResponseDto | HttpException> {
    const user = await this.userRepository.findOne({
      relations: ['job'],
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return plainToClass(UserResponseDto, user);
  }

  // TODO : add typing
  async DeleteUserByName(userToDelete: string): Promise<any> {
    console.log('it works, inside the function ');
    const existingUser = await this.userRepository.findOne({
      select: {
        username: true,
      },
      where: {
        username: userToDelete,
      },
    });

    console.log('result of existingUser : ', existingUser);
    if (existingUser) {
      return await this.userRepository.delete({ username: userToDelete });
    } else {
      throw new HttpException('User cannot be found', 404);
    }
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
      where: { username },
    });
  }

  async getLoggedUser(username: string): Promise<UserResponseDto> {
    const loggedUser = await this.userRepository.findOne({
      select: {
        username: true,
        password: true,
        family_name: true,
      },
      where: {
        username: username,
      },
    });

    if (!loggedUser) {
      throw new HttpException('User not found', 404);
    }
    return plainToClass(UserResponseDto, loggedUser);
  }
}
