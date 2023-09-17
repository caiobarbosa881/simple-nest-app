import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserResponseDto } from './dto/create-user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async findAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll();

    const userDtos: UserDto[] = users.map((user) => ({
      id: user.id,
      name: user.name,
      mail: user.mail,
      birthday: user.birthday,
      createdAt: user.createdAt,
    }));

    return userDtos;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const user = await this.userService.findOne(id);

    const userDto: UserDto = {
      id: user.id,
      name: user.name,
      mail: user.mail,
      birthday: user.birthday,
      createdAt: user.createdAt,
    };

    return userDto;
  }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<CreateUserResponseDto> {
    try {
      const createdUser = await this.userService.create(createUserDto);

      const userDto: CreateUserResponseDto = {
        name: createdUser.name,
        mail: createdUser.mail,
        birthday: createdUser.birthday,
      };

      return userDto;
    } catch (error) {
      throw new HttpException(
        'Erro ao criar usuário',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const updatedUser = await this.userService.update(id, updateUserDto);

    const userDto: UpdateUserDto = {
      name: updatedUser.name,
      mail: updatedUser.mail,
      birthday: updatedUser.birthday,
    };

    return userDto;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.userService.remove(id);
  }
}
