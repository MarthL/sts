import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-userDto.dto';
import { DeleteUserDto } from './DTO/delete-userDto.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async getAllusers() {
    const userCollection = await this.userRepository.find({
      select: {
        id: true,
        username: true,
        password: true,
      },
    });

    return userCollection;
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
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const user = this.userRepository.create({
      username,
      password,
    });

    console.log(user);

    await this.userRepository.save(user);

    return user;
  }

  async checkUserExist(username: string): Promise<Users | undefined> {
    return this.userRepository.findOne({
      select: {
        id: true,
        username: true,
        password: true,
      },
      where: { username },
    });
  }
}
