import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Role } from './users/entities/role.entity';

@Module({
  imports: [
    // Configuración de TypeORM con MySQL
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: 'root',
      password: '',
      database: 'barbershop_app',
      entities: [User, Role],
      synchronize: true, // Sincroniza la base de datos con las entidades (sólo en desarrollo)
    }),
    ConfigModule.forRoot(),
    UsersModule,
  ],
})
export class AppModule {}
