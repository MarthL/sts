import { ApiTags, ApiQuery } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UnauthorizedException,
  ParseIntPipe,
  HttpException,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthLogin } from './../auth/authlogin.service';
import { CreateUserDto } from './dto/create-userDto.dto';
import { UserLoginDto } from 'src/users/dto/user-loginDto.dto';
import { UserResponseDto } from 'src/users/dto/userResponseDto.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UseInterceptors } from '@nestjs/common';
import { Multer, diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authLogin: AuthLogin,
  ) {}

  // GetAll
  @Get('')
  @ApiQuery({ name: 'search', required: false, type: String })
  async getUsers(@Query('search') search: string) {
    return this.usersService.getAllusers(search);
  }

  // GetById
  @Get(':id')
  async getUserById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDto | HttpException> {
    return this.usersService.getUserById(id);
  }

  // getAll projects of user
  @Get(':id/projects')
  async getUserProjects(@Param('id', ParseIntPipe) userId: number) {
    const projects = await this.usersService.getUserProjects(userId);
    return { projects };
  }

  // Delete by id
  @Delete(':id')
  async deleteById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return this.usersService.deleteById(id);
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

  // Patch
  @Patch(':id')
  async updateProject(
    @Param('id') id: number,
    @Body() updateReq: UserResponseDto,
  ): Promise<UpdateResult> {
    return await this.usersService.patch(id, updateReq);
  }

  // Upload profile photo
  @Post(':userId/profile-photo')
  @UseInterceptors(FileInterceptor('photo'))
  async uploadProfilePhoto(
    @Param('userId') userId: number,
    @UploadedFile() file: Multer.File,
  ) {
    const fileUrl = `/uploads/profile-photos/${file.filename}`;
    return this.usersService.updateProfilePicture(userId, fileUrl);
  }
}
