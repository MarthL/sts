import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { AuthModule } from '../auth/auth.module';
import { AuthLogin } from '../auth/authlogin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, AuthLogin],
  exports: [UsersService],
})
export class UsersModule {}
