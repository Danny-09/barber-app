import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { AuthGuard } from '@/auth/guard/auth.guard';
import { RolesGuard } from '@/auth/guard/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { UserRoleEnum } from '@/enums/user-role';

@UseGuards(AuthGuard, RolesGuard)
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Roles(UserRoleEnum.BARBER)
  @Post()
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    return await this.schedulesService.create(createScheduleDto);
  }

  @Roles(UserRoleEnum.BARBER, UserRoleEnum.CUSTOMER)
  @Get(':barber_id')
  async findByBarber(@Param('barber_id') barber_id: number) {
    return await this.schedulesService.findByBarber(barber_id);
  }

  @Roles(UserRoleEnum.BARBER)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateScheduleDto: UpdateScheduleDto) {
    return await this.schedulesService.update(+id, updateScheduleDto);
  }

  @Roles(UserRoleEnum.BARBER)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.schedulesService.remove(+id);
  }
}
