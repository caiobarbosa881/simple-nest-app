import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, collation: 'utf8mb4_unicode_ci' })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    collation: 'utf8mb4_unicode_ci',
  })
  mail: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @CreateDateColumn({ type: 'date' })
  createdAt: Date;
}
