import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Remplacez par votre clé secrète
      signOptions: { expiresIn: '3h' }, // Durée de validité du token
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
