import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ImagesModule } from './images/images.module';
@Module({
  imports: [
    // Configuración de TypeORM con MySQL
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false, // Sincroniza la base de datos con las entidades (sólo en desarrollo)
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    ServicesModule,
    AppointmentsModule,
    SchedulesModule,
    ImagesModule,
  ],
})
export class AppModule { }
