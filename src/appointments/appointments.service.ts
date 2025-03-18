import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Between, Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { StatusEnum } from '@/enums/status.enum';
import { SchedulesService } from '@/schedules/schedules.service';

@Injectable()
export class AppointmentsService {

  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private readonly schedulesService: SchedulesService,
  ) { }

  async create(createAppointmentDto: CreateAppointmentDto) {
    return await this.appointmentRepository.save(createAppointmentDto);
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

  async appointmentsSchedules() {
    // Obtener los slots disponibles para agendar citas
    // Mostrar acorde al mes actual los dias y las horas disponible
    const today = DateTime.now();
    const start = today.startOf('month');
    const end = today.endOf('month');

    // Ejemplo de horarios del barbero (simulación)
    const barberSchedules = await this.schedulesService.findByBarber(10);
    // Mapea nombres de días a números
    const dayMap = {
      'Lunes': 1,
      'Martes': 2,
      'Miercoles': 3,
      'Jueves': 4,
      'Viernes': 5,
      'Sabado': 6,
    };

    // Convierte la lista en un mapa por día numérico
    const scheduleMap = {};
    for (const schedule of barberSchedules) {
      const dayNumber = dayMap[schedule.day];
      if (dayNumber) {
        scheduleMap[dayNumber] = {
          start: schedule.start_time, // ej. "12"
          end: schedule.end_time      // ej. "22"
        };
      }
    }

    const slotsPerDay = {};

    for (let day = start; day <= end; day = day.plus({ days: 1 })) {
      const dayOfWeek = day.weekday; // 1-7

      if (scheduleMap[dayOfWeek]) {
        const { start, end } = scheduleMap[dayOfWeek];

        // Convierte a DateTime
        let currentTime = DateTime.fromISO(`${day.toISODate()}T${start.padStart(2, '0')}:00`);
        const endTime = DateTime.fromISO(`${day.toISODate()}T${end.padStart(2, '0')}:00`);

        const slots: string[] = [];
        while (currentTime < endTime) {
          slots.push(currentTime.toFormat('HH:mm'));
          currentTime = currentTime.plus({ minutes: 30 });
        }

        slotsPerDay[day.toISODate()] = slots;
      }
    }

    const appointments = await this.appointmentsByMonth(today.month, today.year, 10);

    return {
      month: today.monthLong,
      year: today.year,
      available_slots: slotsPerDay,
      // citas_del_mes: appointments,
    };
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
    const appointment = await this.appointmentRepository.findOneBy({id});

    if (!appointment) {
      throw new NotFoundException('appointment not found');
    }

    appointment.status = 1;
    await this.appointmentRepository.save(appointment);

    return appointment;
  }

  async disable(id: number) {
    const appointment = await this.appointmentRepository.findOneBy({id});

    if (!appointment) {
      throw new NotFoundException('appointment not found');
    }

    appointment.status = 2;
    await this.appointmentRepository.save(appointment);

    return appointment;
  }

  async endend(id: number) {
    const appointment = await this.appointmentRepository.findOneBy({id});

    if (!appointment) {
      throw new NotFoundException('appointment not found');
    }

    appointment.status = 3;
    await this.appointmentRepository.save(appointment);

    return appointment;
  }
}
