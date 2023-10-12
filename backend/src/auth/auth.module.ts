import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthLogin } from './authlogin.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', // Remplacez par votre clé secrète
      signOptions: { expiresIn: '3h' }, // Durée de validité du token
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService, AuthLogin],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
