import { Entity, PrimaryColumn, Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date
}
