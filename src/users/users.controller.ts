import { Controller, Get, Post, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('create')
  public async create(@Body() body: CreateUserDto) {
    const response = await this.usersService.create(body);

    return {
      status: 'success',
      message: 'User created successfully',
      data: response,
    };
  }

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

  @Get('customers')
  public async findCustomers() {
    const customers = await this.usersService.findCustomers();
    return customers && customers.length > 0
      ? customers
      : (() => { throw new HttpException({ message: 'No customers found' }, HttpStatus.NOT_FOUND); })();
  }

  @Get('barbers')
  public async findBarbers() {
    const barbers = await this.usersService.findBarbers();
    return barbers && barbers.length > 0
      ? barbers
      : (() => { throw new HttpException({ message: 'No barbers found' }, HttpStatus.NOT_FOUND); })();
  }
}
