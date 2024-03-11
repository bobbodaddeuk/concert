import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConcertModule } from './concert/concert.module';
import { SeatModule } from './seat/seat.module';
import { BookingModule } from './booking/booking.module';
import { PriceModule } from './price/price.module';

@Module({
  imports: [UserModule, ConcertModule, SeatModule, BookingModule, PriceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
