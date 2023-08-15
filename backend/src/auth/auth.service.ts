import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(projectId: number): Promise<string> {
    const payload = { projectId };
    return this.jwtService.signAsync(payload);
  }

  async validateUserAndGetProjectId(
    username: string,
    password: string,
  ): Promise<number | null> {
    // Simulez la validation de l'utilisateur
    if (username === 'martin' && password === 'test') {
      return 1;
    }
    return null;
  }
}
