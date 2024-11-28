import { DataSource } from 'typeorm';
import { Activity } from '../entities/activity';
import { Location } from '../entities/location';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: './data/velosaurus.sqlite',
    synchronize: true,
    logging: true,
    entities: [Activity, Location],
    migrations: ['src/migrations/*.ts'],
    subscribers: [],
    extra: {
        busyTimeout: 3000
    },
});
