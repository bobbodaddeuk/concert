import { Concert } from 'src/concert/entities/concert.entity';
import { Seat } from 'src/seat/entities/seat.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'booking',
})
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', select: true, nullable: false })
  concertId: number;

  @Column({ type: 'bigint', select: false, nullable: false })
  userId: number;

  @Column({ type: 'bigint', select: true, nullable: false })
  seatId: number;

  @Column({ type: 'datetime', select: true, nullable: false })
  createdAt: Date;

  @Column({ type: 'datetime', select: true, nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', select: true })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.booking)
  user: User;

  @ManyToOne(() => Concert, (concert) => concert.booking)
  concert: Concert;

  @OneToOne(() => Seat, (seat) => seat.booking)
  seat: Seat;
}
