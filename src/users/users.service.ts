import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRoleEnum } from 'src/enums/user-role';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async create(body: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async remove(id: number) {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findCustomers(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        where: { role_id: UserRoleEnum.CUSTOMER },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findBarbers(): Promise<User[]> {
    try {
      return await this.userRepository.find({
        where: { role_id: UserRoleEnum.BARBER },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
