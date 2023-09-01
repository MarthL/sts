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
import { ApiTags } from '@nestjs/swagger';
import { UnauthorizedException } from '@nestjs/common';
import { UserResponseDto } from './DTO/userResponseDto.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authLogin: AuthLogin,
  ) {}

  @Get('currentuser')
  async getCurrentUser(username: string): Promise<UserResponseDto> {
    return this.usersService.checkUserExist(username);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserResponseDto> {
    return this.usersService.getUserById(id);
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    const accessToken = await this.authLogin.loginUser(
      user.username,
      user.password,
    );

    return { user, accessToken };
  }

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
