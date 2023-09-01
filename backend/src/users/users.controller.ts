// users/users.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthLogin } from './../auth/authlogin.service';
import { JwtAuthGuard } from './../auth/jwt.auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-userDto.dto';
import { DeleteUserDto } from './DTO/delete-userDto.dto';
import { ApiTags } from '@nestjs/swagger';
import { UnauthorizedException } from '@nestjs/common';
import { UserResponseDto } from './DTO/userResponseDto.dto';
import { HttpException } from '@nestjs/common';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authLogin: AuthLogin,
  ) {}

  // GetAll
  @Get('')
  async getUsers() {
    return this.usersService.getAllusers();
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: number,
  ): Promise<UserResponseDto | HttpException> {
    return this.usersService.getUserById(id);
  }

  // Delete by username
  @Delete(':username')
  async deleteUser(@Param('username') username: string): Promise<any> {
    return await this.usersService.DeleteUserByName(username);
  }

  // getCurrentUser
  @Get('currentuser')
  async getCurrentUser(username: string): Promise<UserResponseDto> {
    return this.usersService.checkUserExist(username);
  }

  // Create a user
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    const accessToken = await this.authLogin.loginUser(
      user.username,
      user.password,
    );

    return { user, accessToken };
  }

  // Login as user
  @Post('login')
  // @UseGuards(JwtAuthGuard)
  async logIn(@Body() loginUserDto: CreateUserDto) {
    const accessToken = await this.authLogin.loginUser(
      loginUserDto.username,
      loginUserDto.password,
    );

    if (!accessToken) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { accessToken };
  }
}
