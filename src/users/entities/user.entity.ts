import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { Service } from '../../services/entities/service.entity'; 
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Schedule } from '../../schedules/entities/schedule.entity';
import { Image } from '../../images/entities/image.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column()
  role_id: number;

  @Column({ nullable: true })
  address: string;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @OneToMany(() => Service, (service) => service.barber_id)
  services: Service[];

  @OneToMany(() => Appointment, (appointment) => appointment.user_id)
  customer_appointments: Appointment[];

  @OneToMany(() => Appointment, (appointment) => appointment.barber_id)
  barber_appointments: Appointment[];

  @OneToMany(() => Schedule, (schedule) => schedule.barber_id)
  schedules: Schedule[];

  @OneToMany(() => Image, (image) => image.barber_id)
  images: Image[];
}
