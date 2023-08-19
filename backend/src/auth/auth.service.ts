import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async generateJwtToken(projectId: number): Promise<string> {
    const payload = { projectId };
    return this.jwtService.signAsync(payload);
  }

  async findUserByUsername(username: string): Promise<any> {
    const user = await this.usersService
      .checkUserExist(username)
      .then((user) => {
        return user;
      })
      .catch((e) => {
        return e;
      });
    return user;
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.findUserByUsername(username);
      console.log(user);
      if (
        user &&
        user.password &&
        (await this.comparePasswords(password, user.password))
      ) {
        const { password: _, ...result } = user;
        console.log('user :', user);
        console.log('result :', result);
        return result;
      }
      return null;
    } catch (error) {
      // Handle the error appropriately, such as logging it.
      console.error('Error validating user:', error);
      return null;
    }
  }
}
