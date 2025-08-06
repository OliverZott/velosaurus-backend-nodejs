import { IsInt, IsOptional, IsString } from "class-validator";
import { ActivityType } from "../entities/activityType";
import { Activity } from "../entities/activity";

export class ActivityDTO {

    name!: string;
    date!: Date;
    length!: number;
    altitudeGain!: number;
    activityType!: ActivityType
    description!: string;
    location?: Location;

    constructor(name: string, date: Date, length: number, altitudeGain: number, activityType: ActivityType, description: string, location?: Location) {
        this.name = name;
        this.date = date;
        this.length = length;
        this.altitudeGain = altitudeGain;
        this.activityType = activityType;
        this.description = description;
        this.location = location;
    }
}

export function mapToActivityDto(activity: Activity): ActivityDTO {
    return {
        name: activity.name,
        date: activity.date,
        length: activity.length,
        altitudeGain: activity.altitudeGain,
        activityType: activity.activityType,
        description: activity.description,
        location: activity.location as Location | undefined
    }
}