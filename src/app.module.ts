import Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConcertModule } from './concert/concert.module';
import { SeatModule } from './seat/seat.module';
import { BookingModule } from './booking/booking.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

const typeOrmModuleOptions = {
  useFactory: async (
    ConfigService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    username: ConfigService.get('DB_USERNAME'),
    password: ConfigService.get('DB_PASSWORD'),
    host: ConfigService.get('DB_HOST'),
    port: ConfigService.get('DB_PORT'),
    database: ConfigService.get('DB_NAME'),
    entities: [],
    synchronize: ConfigService.get('DB_SYNC'),
    logging: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UserModule,
    ConcertModule,
    SeatModule,
    BookingModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
