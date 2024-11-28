import { AppDataSource } from './datasource';
import { Activity } from '../entities/activity';
import { Location } from '../entities/location';
import { ActivityType } from '../entities/activityType';

const seedData = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Data Source has been initialized!');

        const locationRepository = AppDataSource.getRepository(Location);
        const activityRepository = AppDataSource.getRepository(Activity);

        // Seed locations
        const locations = [
            { name: 'Central Park', region: 'New York' },
            { name: 'Golden Gate Park', region: 'San Francisco' },
            { name: 'Hyde Park', region: 'London' }
        ];

        for (const loc of locations) {
            const location = locationRepository.create(loc);
            await locationRepository.save(location);
        }

        // Seed activities
        const activities = [
            {
                name: 'Morning Jog',
                date: new Date('2024-12-01'),
                length: 5.2,
                altitudeGain: 30,
                activityType: ActivityType.Hiking,
                description: 'A refreshing morning jog in the park.',
                locationId: 1
            },
            {
                name: 'Evening Cycling',
                date: new Date('2024-12-02'),
                length: 12.5,
                altitudeGain: 100,
                activityType: ActivityType.Bike,
                description: 'An intense cycling session through the city.',
                locationId: 2
            },
            {
                name: 'Weekend Hike',
                date: new Date('2024-12-03'),
                length: 15.3,
                altitudeGain: 200,
                activityType: ActivityType.Hiking,
                description: 'A beautiful hike through the hills.',
                locationId: 3
            }
        ];

        for (const act of activities) {
            const activity = activityRepository.create(act);
            await activityRepository.save(activity);
        }

        console.log('Seeding completed successfully.');
        await AppDataSource.destroy();
    } catch (err) {
        console.error('Error during seeding:', err);
    }
};

seedData();
