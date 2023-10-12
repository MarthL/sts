import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from '../DTO/User/create-userDto.dto';
import { UserResponseDto } from '../DTO/User/userResponseDto.dto';
import { DeleteUserDto } from '../DTO/User/delete-userDto.dto';
import * as bcrypt from 'bcrypt';

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

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10); // 10 est le nombre de tours de hachage

    const user = new Users();
    user.username = username;
    user.password = hashedPassword; // Utilisez le mot de passe hashé

    // Enregistrez l'utilisateur dans la base de données
    return this.userRepository.save(user);
  }

  async checkUserExist(username: string): Promise<Users | null> {
    return this.userRepository.findOne({
      select: {
        id: true,
        username: true,
        password: true,
        family_name: true,
        job_id: true,
      },
      where: { username },
    });
  }

  async getLoggedUser(username: any): Promise<any> {
    const loggedUser = await this.userRepository.findOne({
      select: {
        username: true,
        password: true,
        family_name: true,
        job_id: true,
      },
      where: {
        username: username,
      },
    });

    if (!loggedUser) {
      throw new HttpException('User not found', 404);
    }
    return loggedUser;
  }

  async getUserById(userId: number): Promise<Users | HttpException> {
    const user = await this.userRepository.findOne({
      select: {
        id: true,
        username: true,
        password: true,
        job_id: true,
      },
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }
}
