import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';


@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) { }

  async create(dto: CreateServiceDto) {
    try {
      return await this.serviceRepository.save(dto);
    }
    catch (error) {
      throw new Error(error);
    }
  }

  async findAllByBarber(
    barber_id: number,
    options: IPaginationOptions
  ): Promise<Pagination<Service>> {
    const queryBuilder = this.serviceRepository.createQueryBuilder('service')
      .where('service.barber_id = :barber_id AND service.status = :status', { barber_id, status: true });

    return paginate<Service>(queryBuilder, options);
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {

    const service = await this.serviceRepository.findOneBy({ id });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    return await this.serviceRepository.update(id, updateServiceDto);
  }

  async findAllEnabled() {
    return await this.serviceRepository.find({
      where: {
        status: true,
      },
    });
  }

  async enable(id: number) {
    const service = await this.serviceRepository.findOneBy({id});

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    service.status = true;
    await this.serviceRepository.save(service);

    return service;
  }

  async disable(id: number) {
    const service = await this.serviceRepository.findOneBy({id});

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    service.status = false;
    await this.serviceRepository.save(service);

    return service;
  }
}
