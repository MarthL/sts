// users/users.controller.ts

import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { Users } from './users.entity';

import { JwtAuthGuard } from './../auth/jwt.auth.guard';

import { UsersService } from './users.service';
import { AuthLogin } from './../auth/authlogin.service';

import { CreateUserDto } from '../DTO/User/create-userDto.dto';
import { DeleteUserDto } from '../DTO/User/delete-userDto.dto';
import { UserResponseDto } from '../DTO/User/userResponseDto.dto';
import { UserLoginDto } from 'src/DTO/User/user-loginDto.dto';

import { UnauthorizedException, ParseIntPipe } from '@nestjs/common';

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
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Users | HttpException> {
    return this.usersService.getUserById(id);
  }

  // Delete by username
  @Delete(':username')
  async deleteUser(@Param('username') username: string): Promise<any> {
    return await this.usersService.DeleteUserByName(username);
  }

  // getCurrentUser for Auth only
  @Get('currentuser')
  async getCurrentUser(username: string): Promise<any> {
    return this.usersService.checkUserExist(username);
  }

  @Get('loggedUser/:user')
  async getLoggedUser(
    @Param('user') username: string,
  ): Promise<UserResponseDto> {
    return this.usersService.getLoggedUser(username);
  }

  // Create a user
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return { user };
  }

  // Login as user
  @Post('login')
  // @UseGuards(JwtAuthGuard)
  async logIn(@Body() loginUserDto: UserLoginDto) {
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
