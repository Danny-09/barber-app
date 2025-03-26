import { Service } from "../../services/entities/service.entity";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from "typeorm";

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: string;

    @ManyToOne(() => User, (user) => user.customer_appointments)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    user_id: number;

    @ManyToOne(() => User, (user) => user.barber_appointments)
    @JoinColumn({ name: 'barber_id' })
    barber: User;

    @Column()
    barber_id: number;

    @ManyToOne(() => Service, (service) => service.appointments)
    @JoinColumn({ name: 'service_id' })
    service: Service;
    
    @Column()
    service_id: number;

    @Column()
    status: number;

    @Column({ nullable: true })
    total: number;

    @CreateDateColumn({ nullable: true })
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;
}
