import { UserService } from './user.service';
import { UserEntity } from './user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<UserEntity[]>;
    findById(id: string): Promise<UserEntity | undefined>;
    create(user: UserEntity): Promise<UserEntity>;
    update(id: string, user: UserEntity): Promise<UserEntity | undefined>;
    remove(id: string): Promise<void>;
}
