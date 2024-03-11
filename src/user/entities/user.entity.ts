import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from '../types/userRole.type';
import { Booking } from 'src/booking/entities/booking.entity';

@Index('email', ['email'], { unique: true })
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'bigint', select: true, nullable: false })
  age: number;

  @Column({ type: 'varchar', select: true, nullable: false })
  name: string;

  @Column({ type: 'datetime', select: true, nullable: false })
  createdAt: Date;

  @Column({ type: 'bigint', select: true, nullable: false })
  point: number;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @OneToMany(() => Booking, (booking) => booking.user)
  booking: Booking[];
}
