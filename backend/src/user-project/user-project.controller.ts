import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserProjectService } from './user-project.service';
import { ApiTags } from '@nestjs/swagger';
import { AssignUserDto } from './dto/assignUserDto.dto';

@ApiTags('projectUser')
@Controller('/projectUser')
export class UserProjectController {
  constructor(private readonly userProjectService: UserProjectService) {}

  @Post('assign')
  async assignUserToProject(@Body() body: AssignUserDto) {
    return this.userProjectService.assignUserToProject(
      { id: body.userId } as any,
      { id: body.projectId } as any,
      body.occupation_rate,
    );
  }

  @Get('user/:userId')
  async getProjectsForUser(@Param('userId') userId: number) {
    return this.userProjectService.getProjectsForUser(userId);
  }

  @Get('project/:projectId')
  async getUsersForProject(@Param('projectId') projectId: number) {
    return this.userProjectService.getUsersForProject(projectId);
  }

  @Delete()
  async unassign(@Body() body: { userId: number; projectId: number }) {
    return this.userProjectService.unassignUserFromProject(
      body.userId,
      body.projectId,
    );
  }

  @Patch('rate')
  async updateOccupationRate(
    @Body() body: { userId: number; projectId: number; rate: number },
  ) {
    return this.userProjectService.updateOccupationRate(
      body.userId,
      body.projectId,
      body.rate,
    );
  }
}
