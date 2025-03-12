import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.scheduleRepository.save(createScheduleDto);
  }

  async findByBarber(barber_id: number) {
    return await this.scheduleRepository.find({
      where: {
        barber_id: barber_id,
      },
    });
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    const schedule = await this.scheduleRepository.findOneBy({ id });

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    };

    return await this.scheduleRepository.update(id, updateScheduleDto);
  }

  async remove(id: number) {
    return await this.scheduleRepository.delete(id);
  }
}
