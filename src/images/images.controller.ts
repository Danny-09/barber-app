import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { AuthGuard } from '@/auth/guard/auth.guard';
import { RolesGuard } from '@/auth/guard/roles.guard';
import { Roles } from '@/decorators/roles.decorator';
import { UserRoleEnum } from '@/enums/user-role';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@UseGuards(AuthGuard, RolesGuard)
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Roles(UserRoleEnum.BARBER)
  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads/images',
      filename: (req, file, callback) => {
        const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
        callback(null, uniqueSuffix);
      },
    }),
  }))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createImageDto: CreateImageDto
  ) {
    return await this.imagesService.create(image, createImageDto);
  }

  @Roles(UserRoleEnum.BARBER, UserRoleEnum.CUSTOMER)
  @Get(':barber_id')
  async findAllByBarber(@Param('barber_id') barber_id: number) {
    return await this.imagesService.findAllByBarber(barber_id);
  }


  @Roles(UserRoleEnum.BARBER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Roles(UserRoleEnum.BARBER)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.imagesService.remove(id);
  }
}
