import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRoleEnum } from 'src/enums/user-role';
import * as bcrypt from 'bcrypt';
import { Role } from './entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) { }

  public async create(body: CreateUserDto): Promise<User> {
    try {
      body.password = await bcrypt.hash(body.password, 10);
      return await this.userRepository.save(body);
    } catch (error) {
      throw error;
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

  public async findBarbers(): Promise<Partial<User>[]> {
    try {
      const barbers = await this.userRepository.find({
        where: { role_id: UserRoleEnum.BARBER },
      });

      return barbers.map(({ password, role_id, email, created_at, updated_at, ...rest }) => rest);
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findByEmail(email: string): Promise<User | any> {
    return await this.userRepository.findOneBy({ email });
  }

  public async roles(): Promise<Role[]> {

    // Si no existen roles, inserta roles manualmente
    const rolesToInsert = [
      { name: 'SUPER_ADMIN' },
      { name: 'BARBER' },
      { name: 'CUSTOMER' },
    ]

    await this.roleRepository.save(rolesToInsert); // Inserta los roles manualmente

    // Devuelve todos los roles (insertados o existentes)
    return await this.roleRepository.find();
  }
}
