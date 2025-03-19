import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AuthGuard } from '@/auth/guard/auth.guard';
import { RolesGuard } from '@/auth/guard/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { UserRoleEnum } from '@/enums/user-role';

@UseGuards(AuthGuard, RolesGuard)
@Controller('appointments')
export class AppointmentsController {

  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Roles(UserRoleEnum.CUSTOMER)
  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return await this.appointmentsService.create(createAppointmentDto);
  }

  @Roles(UserRoleEnum.BARBER, UserRoleEnum.CUSTOMER)
  @Get(':month/:year/:barber_id')
  async appointmentsByMonth(@Param('month') month: number, @Param('year') year: number, @Param('barber_id') barber_id: number) {
    return await this.appointmentsService.appointmentsByMonth(month, year, barber_id);
  }

  @Roles(UserRoleEnum.BARBER, UserRoleEnum.CUSTOMER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Roles(UserRoleEnum.BARBER, UserRoleEnum.CUSTOMER)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.appointmentsService.remove(+id);
  }

  @Roles(UserRoleEnum.BARBER, UserRoleEnum.CUSTOMER)
  @Patch('enable/:id')
  async enable(@Param('id') id: number) {
    return this.appointmentsService.enable(+id);
  }

  @Roles(UserRoleEnum.BARBER, UserRoleEnum.CUSTOMER)
  @Patch('disable/:id')
  async disable(@Param('id') id: number) {
    return this.appointmentsService.disable(+id);
  }

  @Roles(UserRoleEnum.BARBER)
  @Patch('endend/:id')
  async endend(@Param('id') id: number) {
    return this.appointmentsService.disable(+id);
  }
}
