import { Controller, Get, Post, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '@/decorators/roles.decorator';
import { AuthGuard } from '@/auth/guard/auth.guard';
import { RolesGuard } from '@/auth/guard/roles.guard';
import { UserRoleEnum } from '@/enums/user-role';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Post('register')
  public async createByAdmin(@Body() body: CreateUserDto) {
    const response = await this.usersService.create(body);

    return {
      status: 'success',
      message: 'User created successfully',
      data: response,
    };
  }

  @Post('public-register')
  public async create(@Body() body: CreateUserDto) {
    try {
      const response = await this.usersService.create(body);
      return {
        status: 'success',
        message: 'You have successfully registered',
        data: response,
      };
    } catch (error) {
      console.error('Error in registration:', error);
      // Lanza una excepción HTTP 500 con el mensaje de error
      throw new HttpException(
        {
          status: 'error',
          message: error.message || 'An error occurred during registration',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.BARBER, UserRoleEnum.CUSTOMER)
  @Patch('update/:id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const response = await this.usersService.update(+id, updateUserDto);
    return {
      status: 'success',
      message: 'User updated successfully',
      data: response.affected,
    };
  }

  @Delete('remove/:id')
  public async remove(@Param('id') id: string) {
    const response = await this.usersService.remove(+id);
    return {
      status: 'success',
      message: 'User deleted successfully',
      data: response.affected,
    };
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoleEnum.SUPER_ADMIN)
  @Get('customers')
  public async findCustomers() {
    const customers = await this.usersService.findCustomers();
    return customers && customers.length > 0
      ? customers
      : (() => { throw new HttpException({ message: 'No customers found' }, HttpStatus.NOT_FOUND); })();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.CUSTOMER)
  @Get('barbers')
  public async findBarbers() {
    const barbers = await this.usersService.findBarbers();
    return barbers && barbers.length > 0
      ? barbers
      : (() => { throw new HttpException({ message: 'No barbers found' }, HttpStatus.NOT_FOUND); })();
  }

  @Get('checkapi')
  public async api() {
    return await this.usersService.roles();
  }
}
