import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-userDto.dto';
<<<<<<< HEAD
import { UserResponseDto } from './DTO/userResponseDto.dto';
import * as bcrypt from 'bcrypt';
=======
import { DeleteUserDto } from './DTO/delete-userDto.dto';
>>>>>>> e090fd22faf5dede52acb68530856caf3491e627

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

<<<<<<< HEAD
  async getAllUsers(): Promise<Users[]> {
    return this.userRepository.find();
=======
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
>>>>>>> e090fd22faf5dede52acb68530856caf3491e627
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const { username, password } = createUserDto;
<<<<<<< HEAD

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users();
    newUser.username = username;
    newUser.password = hashedPassword;

    return this.userRepository.save(newUser);
=======
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
>>>>>>> e090fd22faf5dede52acb68530856caf3491e627
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
