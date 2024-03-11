import { Booking } from 'src/booking/entities/booking.entity';
import { Seat } from 'src/seat/entities/seat.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'concert',
})
export class Concert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', select: true, nullable: false })
  bookingId: number;

  @Column({ type: 'varchar', select: false, nullable: false })
  title: string;

  @Column({ type: 'varchar', select: true, nullable: false })
  content: string;

  @Column({ type: 'datetime', select: true, nullable: false })
  startTime: Date;

  @Column({ type: 'datetime', select: true, nullable: false })
  endTime: Date;

  @Column({ type: 'varchar', select: true, nullable: false })
  place: string;

  @OneToMany(() => Booking, (booking) => booking.concert)
  booking: Booking[];

  @OneToMany(() => Seat, (seat) => seat.concert)
  seat: Seat[];
}
