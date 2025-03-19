import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('schedules')
export class Schedule {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, barber => barber.schedules)
    @JoinColumn({ name: 'barber_id' })
    barber: User;

    @Column()
    barber_id: number;

    @Column()
    day: string;

    @Column()
    start_time: string;

    @Column()
    end_time: string;
}
