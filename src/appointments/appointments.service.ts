import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Between, Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { StatusEnum } from '@/enums/status.enum';
import { UsersService } from '@/users/users.service';
import { plainToClass } from 'class-transformer';
import { AppointmentGateway } from '@/config/appointment.gateway';

@Injectable()
export class AppointmentsService {

  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private userService: UsersService,
    private appointmentGateway: AppointmentGateway,
  ) { }

  async create(createAppointmentDto: CreateAppointmentDto) {
    const user = await this.userService.findByEmail(createAppointmentDto.email);
    createAppointmentDto.user_id = user.id;
    
    const appointment = await this.appointmentRepository.save(createAppointmentDto);
    this.appointmentGateway.sendAppointmentUpdate(appointment);

    return appointment;
  }

  async appointmentsByMonth(month: number, year: number, barber_id: number) {

    const startDate = DateTime.local(year, month, 1).startOf('month').toISODate();
    const endDate = DateTime.local(year, month, 1).endOf('month').toISODate();

    return await this.appointmentRepository.find({
      where: {
        date: Between(startDate, endDate),
        barber_id: barber_id,
        status: StatusEnum.ACTIVE,
      },
      order: {
        date: 'ASC',
      },
    });
  }

  async appointmentsByUser(email: string): Promise<Appointment[]> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }
    const appointments = await this.appointmentRepository.find({
      where: {
        user_id: user.id,
        status: StatusEnum.ACTIVE,
      },
      relations: ['barber', 'service'],
    });

    return plainToClass(Appointment, appointments);
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.appointmentRepository.findOneBy({ id });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return await this.appointmentRepository.update(id, updateAppointmentDto);
  }

  async remove(id: number) {
    return await this.appointmentRepository.delete(id);
  }

  async enable(id: number) {
    const appointment = await this.appointmentRepository.findOneBy({ id });

    if (!appointment) {
      throw new NotFoundException('appointment not found');
    }

    appointment.status = StatusEnum.ACTIVE;
    await this.appointmentRepository.save(appointment);

    return appointment;
  }

  async disable(id: number) {
    const appointment = await this.appointmentRepository.findOneBy({ id });

    if (!appointment) {
      throw new NotFoundException('appointment not found');
    }

    appointment.status = StatusEnum.AVAILABLE;
    await this.appointmentRepository.save(appointment);

    return appointment;
  }

  async endend(id: number) {
    const appointment = await this.appointmentRepository.findOneBy({ id });

    if (!appointment) {
      throw new NotFoundException('appointment not found');
    }

    appointment.status = StatusEnum.ENDEND;
    await this.appointmentRepository.save(appointment);

    return appointment;
  }
}
