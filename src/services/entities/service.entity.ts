import { Appointment } from "../../appointments/entities/appointment.entity";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('services')
export class Service {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    status: boolean;

    @ManyToOne(() => User, (user) => user.services)
    @JoinColumn({ name: 'barber_id' })
    barber: User;

    @Column()
    barber_id: number;

    @CreateDateColumn({ nullable: true })
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;

    @OneToMany(() => Appointment, (appointment) => appointment.service_id)
    appointments: Appointment[];
}
