import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './projects/projects.entity';
import { ProjectsModule } from './projects/projects.module';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy'; // Créez cette classe
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthLogin } from './auth/authlogin.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'yourSecretKey', // Changez ceci par votre clé secrète
      signOptions: { expiresIn: '3h' }, // Durée de validité du token
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'sts',
      entities: [Projects],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Projects]),
    ProjectsModule,
  ],
  controllers: [AuthController],
  providers: [JwtStrategy, AuthService, AuthLogin],
  exports: [PassportModule, JwtModule],
})
export class AppModule {}
