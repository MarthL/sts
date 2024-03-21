import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthLogin } from './authlogin.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authLogin: AuthLogin) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const result = await this.authLogin.loginUser(username, password);
    return { accessToken: result.accessToken };
  }
}