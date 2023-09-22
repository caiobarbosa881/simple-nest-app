import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(username: string, pass: string): Promise<UserDto> {
    const user = await this.userService.findOneForLogin(username);
    if (user?.password != pass) {
      console.log(pass);
      throw new UnauthorizedException();
    }

    const userDtos: UserDto = {
      id: user.id,
      name: user.name,
      mail: user.mail,
      birthday: user.birthday,
      createdAt: user.createdAt,
    };

    return userDtos;
  }
}
