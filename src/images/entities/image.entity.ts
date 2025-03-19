import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('images')
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image : string;

    @ManyToOne(() => User, barber => barber.images)
    barber: User;

    @Column()
    barber_id: number;
}
