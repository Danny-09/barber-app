import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) { }

  async create(image: Express.Multer.File, createImageDto: CreateImageDto) {
    createImageDto.image = image.filename;
    return await this.imageRepository.save(createImageDto);
  }

  async findAllByBarber(barber_id: number) {
    return await this.imageRepository.find({ where: { barber_id } });
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  async remove(id: number) {
    return await this.imageRepository.delete(id);
  }
}
