import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAllWithSortingAndPagination(queryValue?): Promise<UserDto[]> {
    const { _start, _end, _sort, _order } = queryValue;

    if (_order === undefined) {
      const queryBuilder = this.userRepository
        .createQueryBuilder('user')
        .skip(_start)
        .take(_end - _start + 1);

      const users = await queryBuilder.getMany();

      const userDtos: UserDto[] = users.map((user) => ({
        id: user.id,
        name: user.name,
        mail: user.mail,
        birthday: user.birthday,
        createdAt: user.createdAt,
      }));

      return userDtos;
    } else {
      const queryBuilder = this.userRepository
        .createQueryBuilder('user')
        .orderBy(`LOWER(user.${_sort})`, _order.toUpperCase())
        .skip(_start)
        .take(_end - _start + 1);

      const users = await queryBuilder.getMany();

      const userDtos: UserDto[] = users.map((user) => ({
        id: user.id,
        name: user.name,
        mail: user.mail,
        birthday: user.birthday,
        createdAt: user.createdAt,
      }));

      return userDtos;
    }
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(
        `Usuário com esse id ${id} não foi encontrado`,
      );
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const existingUser = await this.findOne(id);
    const updatedUser = { ...existingUser, ...updateUserDto };
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(
        `Usuário com esse id ${id} não foi encontrado`,
      );
    }
    await this.userRepository.remove(user);
  }
}
