import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service'; // Importez AuthService depuis le même dossier

@Injectable()
export class AuthLogin {
  constructor(private readonly authService: AuthService) {}

  async loginUser(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    // Vérifiez les informations d'identification de l'utilisateur
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Générez le token JWT en utilisant le service AuthService
    const accessToken = await this.authService.generateJwtToken(user);

    return { accessToken };
  }
}
