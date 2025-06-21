import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProject } from './user-project.entity';
import { UserProjectService } from './user-project.service';
import { UserProjectController } from './user-project.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserProject])],
  providers: [UserProjectService],
  controllers: [UserProjectController],
  exports: [UserProjectService, TypeOrmModule.forFeature([UserProject])],
})
export class UserProjectModule {}
