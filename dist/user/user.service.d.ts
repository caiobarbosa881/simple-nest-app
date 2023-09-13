import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    findAll(): Promise<UserEntity[]>;
    findById(id: string): Promise<UserEntity | undefined>;
    create(user: UserEntity): Promise<UserEntity>;
    update(id: string, user: UserEntity): Promise<UserEntity | undefined>;
    remove(id: string): Promise<void>;
}
