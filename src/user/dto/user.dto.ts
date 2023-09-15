import { IsEmail, IsNotEmpty, IsDate, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly mail: string;

  @IsNotEmpty()
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
