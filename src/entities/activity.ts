
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsString, MaxLength, IsOptional, IsNumber, IsDate } from 'class-validator';
import { Location } from './location';
import { BaseEntity } from './baseEntity';
import { ActivityType } from './activityType';

@Entity({ name: 'activities' })
export class Activity extends BaseEntity {

    @Column({ length: 50 })
    @MaxLength(50, { message: 'Name can be at most 50 characters long' })
    @IsNotEmpty({ message: 'Name is required' })
    @IsString()
    name: string;

    @Column()
    @IsNotEmpty({ message: 'Date is required' })
    @IsDate()
    date: Date;

    @Column('float')
    @IsNumber()
    length: number;

    @Column('float')
    @IsNumber()
    altitudeGain: number;

    @Column()
    @IsNotEmpty({ message: 'Activity type is required' })
    activityType: ActivityType;

    @Column({ length: 250 })
    @MaxLength(250, { message: 'Description can be at most 250 characters long' })
    @IsString()
    description: string;

    @Column({ nullable: true })
    @IsOptional()
    @IsNumber()
    locationId?: number;

    @ManyToOne(() => Location, location => location.activities, { nullable: true })
    @JoinColumn({ name: 'locationId' })
    location?: Location;

    constructor(name: string, date: Date, length: number, altitudeGain: number, activityType: ActivityType, description: string, locationId?: number) {
        super();
        this.name = name;
        this.date = date;
        this.length = length;
        this.altitudeGain = altitudeGain;
        this.activityType = activityType;
        this.description = description;
        if (locationId) {
            this.locationId = locationId;
        }
    }
}
