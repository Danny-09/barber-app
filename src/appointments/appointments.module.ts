import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { UsersModule } from '@/users/users.module';
import { AppointmentGateway } from '@/config/appointment.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    UsersModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, AppointmentGateway],
})
export class AppointmentsModule {}
