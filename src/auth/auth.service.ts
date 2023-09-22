import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from '../user/dto/signin-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<SignInResponseDto> {
    const user = await this.userService.findOneForLogin(username);
    if (user?.password != pass) {
      console.log(pass);
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.name,
      mail: user.mail,
      birthday: user.birthday,
      createdAt: user.createdAt,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
