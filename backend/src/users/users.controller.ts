// users/users.controller.ts

import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common';
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { Users } from './users.entity';
import { Projects } from 'src/projects/projects.entity';

import { JwtAuthGuard } from './../auth/jwt.auth.guard';

import { UsersService } from './users.service';
import { AuthLogin } from './../auth/authlogin.service';
import { ProjectsService } from 'src/projects/projects.service';

import { CreateUserDto } from '../DTO/User/create-userDto.dto';
import { DeleteUserDto } from '../DTO/User/delete-userDto.dto';
import { UserLoginDto } from 'src/DTO/User/user-loginDto.dto';
import { UserResponseDto } from 'src/DTO/User/userResponseDto.dto';

import { UnauthorizedException, ParseIntPipe } from '@nestjs/common';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService,
    private readonly authLogin: AuthLogin,
  ) {}

  // GetAll
  @Get('')
  async getUsers() {
    return this.usersService.getAllusers();
  }

  // GetById
  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto | HttpException> {
    return this.usersService.getUserById(id);
  }

  // get all projects of user
  @Get(':id/projects')
  async getUserProjects(@Param('id', ParseIntPipe) userId: number) {
    const projects = await this.usersService.getUserProjects(userId);
    return { projects };
  }

  // Delete by username
  @Delete(':username')
  async deleteUser(@Param('username') username: string): Promise<any> {
    return await this.usersService.DeleteUserByName(username);
  }

  // getCurrentUser for Auth only
  @Get('currentuser')
  async getCurrentUser(username: string): Promise<UserResponseDto> {
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
