import { IsDate, IsEmail, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsEmail()
  readonly mail: string;

  @IsDate()
  readonly birthday: Date;

  @IsDate()
  readonly createdAt: Date;

  constructor(
    id: string,
    name: string,
    mail: string,
    birthday: Date,
    createdAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.mail = mail;
    this.birthday = birthday;
    this.createdAt = createdAt;
  }
}
