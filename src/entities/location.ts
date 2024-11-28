import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';
import { Activity } from './activity';
import { BaseEntity } from './baseEntity';

@Entity({ name: 'locations' })
export class Location extends BaseEntity {

    @Column({ length: 50 })
    @MaxLength(50, { message: 'Name can be at most 50 characters long' })
    @IsNotEmpty({ message: 'Name is required' })
    @IsString()
    name: string;

    @Column({ length: 50, nullable: true })
    @MaxLength(50, { message: 'Region can be at most 50 characters long' })
    @IsOptional()
    @IsString()
    region?: string;

    @OneToMany(() => Activity, activity => activity.location)
    activities: Activity[] = [];

    constructor(name: string, region?: string) {
        super();
        this.name = name;
        if (region) {
            this.region = region;
        }
    }
}
