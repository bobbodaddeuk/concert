import { Booking } from 'src/booking/entities/booking.entity';
import { Concert } from 'src/concert/entities/concert.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from '../types/status.types';
import { Grade } from '../types/grade.types';

@Entity({
  name: 'seat',
})
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', select: true, nullable: false })
  price: number;

  @Column({ type: 'bigint', select: false, nullable: false })
  concertId: number;

  @Column({ type: 'enum', select: true, default: Grade.A })
  grade: Grade;

  @Column({ type: 'enum', select: true, default: Status.FORSALE })
  status: Status;

  @Column({ type: 'bigint', select: true, nullable: false })
  seatNumber: number;

  @OneToOne(() => Booking, (booking) => booking.seat)
  booking: Booking;

  @ManyToOne(() => Concert, (concert) => concert.seat)
  concert: Concert;
}
