import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-userDto.dto';
import { UserResponseDto } from './DTO/userResponseDto.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async getAllUsers(): Promise<Users[]> {
    return this.userRepository.find();
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

  async getUserById(userId: number): Promise<UserResponseDto | undefined> {
    return this.userRepository.findOneBy({ id: userId });
  }
}
