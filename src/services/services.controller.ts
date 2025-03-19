import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthGuard } from '@/auth/guard/auth.guard';
import { RolesGuard } from '@/auth/guard/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { UserRoleEnum } from '@/enums/user-role';

@UseGuards(AuthGuard, RolesGuard)
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @Roles(UserRoleEnum.BARBER)
  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    const response = await this.servicesService.create(createServiceDto);

    return {
      status: 'success',
      message: 'Service created successfully',
      data: response,
    };
  }

  @Roles(UserRoleEnum.BARBER, UserRoleEnum.CUSTOMER)
  @Get()
  findByBarber(
    @Query('barber_id') barber_id: number,
    @Query('page') page = 1,
    @Query('limit') limit = 10
  ) {
    return this.servicesService.findAllByBarber(barber_id, {
      page,
      limit,
      route: '/services',
    });
  }

  @Roles(UserRoleEnum.BARBER)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    await this.servicesService.update(+id, updateServiceDto);

    return {
      status: 'success',
      message: 'Service updated successfully',
    };
  }

  @Roles(UserRoleEnum.BARBER)
  @Get('enabled')
  async findAllEnabled() {
    return this.servicesService.findAllEnabled();
  }

  @Roles(UserRoleEnum.BARBER)
  @Patch('enable/:id')
  async enable(@Param('id') id: number) {
    return this.servicesService.enable(+id);
  }

  @Roles(UserRoleEnum.BARBER)
  @Patch('disable/:id')
  async disable(@Param('id') id: number) {
    return this.servicesService.disable(+id);
  }
}
