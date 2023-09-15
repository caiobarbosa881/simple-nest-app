import { UserService } from './user.service';
import { UserEntity } from './user.entity';
export declare class UserController {
  private readonly userService;
  constructor(userService: UserService);
  findAll(): Promise<UserEntity[]>;
}
