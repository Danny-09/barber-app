import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SchedulesService {

  constructor(
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>
  ) { }

  async create(createScheduleDto: CreateScheduleDto) {
    const existingDay = await this.scheduleRepository.findOne({
      where: {
        barber_id: createScheduleDto.barber_id,
        day: createScheduleDto.day
      }
    });

    if (existingDay) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: `Ya existe un horario registrado para el día ${createScheduleDto.day}.`,
        },
        HttpStatus.CONFLICT,
      );
    }

    return await this.scheduleRepository.save(createScheduleDto);
  }

  async findByBarber(barber_id: number) {
    const schedules = await this.scheduleRepository.find({
      where: {
        barber_id: barber_id,
      },
    });

    const dayOrder = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
    schedules.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

    return schedules;
  }


  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    const schedule = await this.scheduleRepository.findOneBy({ id });

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    };

    await this.scheduleRepository.update(id, updateScheduleDto);

    return await this.scheduleRepository.findOneBy({ id })
  }

  async remove(id: number) {
    return await this.scheduleRepository.delete(id);
  }
}
