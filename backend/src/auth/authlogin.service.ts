import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service'; 

@Injectable()
export class AuthLogin {
  constructor(private readonly authService: AuthService) {}

  async loginUser(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.authService.generateJwtToken(user);

    return { accessToken };
  }
}
