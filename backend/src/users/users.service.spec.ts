import { TestingModule, Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserResponseDto } from './dto/userResponseDto.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  it('should call getAllusers with correct parameters', async () => {
    const search = 'test';
    await service.getAllusers(search);
    expect(repository.find).toHaveBeenCalledWith({
      select: {
        id: true,
        username: true,
        password: true,
        profile_picture: true,
      },
      where: {
        username: search,
      },
    });
  });
  it('should call getUserById with correct parameters', async () => {
    const id = 1;
    await service.getUserById(id);
    expect(repository.findOne).toHaveBeenCalledWith({
      relations: ['job', 'company', 'city'],
      where: {
        id: id,
      },
    });
  });

  it('should call getUserProjects with correct parameters', async () => {
    const id = 1;
    await service.getUserProjects(id);
    expect(repository.findOne).toHaveBeenCalledWith({
      relations: ['projectsCollection'],
      where: {
        id: id,
      },
    });
  });

  it('should call deleteById with correct parameters', async () => {
    const id = 1;
    await service.deleteById(id);
    expect(repository.delete).toHaveBeenCalledWith(id);
  });

  it('should call createUser with correct parameters', async () => {
    const createUserDto = { username: 'test', password: 'test' };
    await service.createUser(createUserDto);
    expect(repository.save).toHaveBeenCalled();
  });

  it('should call checkUserExist with correct parameters', async () => {
    const username = 'test';
    await service.checkUserExist(username);
    expect(repository.findOne).toHaveBeenCalledWith({
      select: {
        id: true,
        username: true,
        password: true,
        family_name: true,
      },
      where: { username: username },
    });
  });

  it('should call getLoggedUser with correct parameters', async () => {
    const username = 'test';
    await service.getLoggedUser(username);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: {
        username: username,
      },
      relations: ['job', 'company', 'city'],
    });
  });

  it('should throw an exception if user not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
    await expect(service.getLoggedUser('username')).rejects.toThrow(
      HttpException,
    );
  });

  it('should call patch with correct parameters', async () => {
    const id = 1;
    const updateReq = { name: 'test' } as any;
    await service.patch(id, updateReq);
    expect(repository.update).toHaveBeenCalledWith(id, updateReq);
  });

  it('should call updateProfilePicture with correct parameters', async () => {
    const id = 1;
    const fileUrl = 'test';
    await service.updateProfilePicture(id, fileUrl);
    expect(repository.update).toHaveBeenCalledWith(id, {
      profile_picture: fileUrl,
    });
  });

  it('should throw an exception if user not found', async () => {
    const id = 1;
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
    try {
      await service.getUserById(id);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.status).toEqual(404);
    }
  });

  it('should return a user if user is found in findById', async () => {
    const id = 1;
    const user = { id, username: 'test', password: 'test' } as any;
    jest.spyOn(repository, 'findOne').mockResolvedValue(user);
    const result = await service.getUserById(id);
    expect(result).toEqual(plainToClass(UserResponseDto, user));
  });

  it('should throw an exception if user not found in getUserProjects', async () => {
    const id = 1;
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
    try {
      await service.getUserProjects(id);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
      expect(e.status).toEqual(404);
    }
  });

  it('should call update with correct parameters when job_id and company_id are defined', async () => {
    const id = 1;
    const updateReq = {
      job_id: 2,
      company_id: 3,
      city_id: 4,
      name: 'test',
    } as any;
    await service.patch(id, updateReq);
    expect(repository.update).toHaveBeenCalledWith(id, {
      job: { id: updateReq.job_id },
      company: { id: updateReq.company_id },
      city: { id: updateReq.city_id },
      name: 'test',
    });
  });

  it('should call update with correct parameters when only city_id is defined', async () => {
    const id = 1;
    const updateReq = { city_id: 4, name: 'test' } as any;
    await service.patch(id, updateReq);
    expect(repository.update).toHaveBeenCalledWith(id, {
      city: { id: updateReq.city_id },
      name: 'test',
    });
  });

  it('should throw an exception if user not found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
    await expect(service.updateProfilePicture(1, 'fileUrl')).rejects.toThrow(
      HttpException,
    );
  });

  it('should call update with correct parameters when job_id, company_id and city_id are undefined', async () => {
    const id = 1;
    const updateReq = { name: 'test' } as any;
    await service.patch(id, updateReq);
    expect(repository.update).toHaveBeenCalledWith(id, { name: 'test' });
  });

  it('should return projects if user is found in getUserProjects', async () => {
    const id = 1;
    const user = {
      id,
      username: 'test',
      password: 'test',
      projectsCollection: ['project1', 'project2'],
    } as any;
    jest.spyOn(repository, 'findOne').mockResolvedValue(user);
    const result = await service.getUserProjects(id);
    expect(result).toEqual(user.projectsCollection);
  });
});
