import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-userDto.dto';
import { UserResponseDto } from './DTO/userResponseDto.dto';
import * as bcrypt from 'bcrypt';

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

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users();
    newUser.username = username;
    newUser.password = hashedPassword;

    return this.userRepository.save(newUser);
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
