import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Location } from '../entities/location';
import { validate } from 'class-validator';
import { AppDataSource } from '../db/datasource';


// GET: api/locations
export const getLocations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const locationRepository = AppDataSource.getRepository(Location);
        const locations = await locationRepository.find();
        res.json(locations);
    } catch (err) {
        console.error('Error fetching locations:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getLocationById = async (req: Request, res: Response): Promise<void> => {
    const locationRepository = AppDataSource.getRepository(Location);
    const location = await locationRepository.findOneBy({ id: Number(req.params.id) });

    if (!location) {
        res.status(404).json({ message: 'Location not found' });
        return;
    }

    res.json(location);
}

// POST: api/locations
export const createLocation = async (req: Request, res: Response): Promise<void> => {
    const locationRepository = AppDataSource.getRepository(Location);
    const location = locationRepository.create(req.body);

    const errors = await validate(location);
    if (errors.length > 0) {
        res.status(400).json({ message: 'Validation failed', errors });
    }

    try {
        await locationRepository.save(location);
        res.status(201).json(location);
    } catch (err) {
        console.error('Error creating location:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// PUT: api/locations/:id
export const updateLocation = async (req: Request, res: Response): Promise<void> => {
    const locationRepository = AppDataSource.getRepository(Location);
    const location = await locationRepository.findOneBy({ id: Number(req.params.id) });

    if (!location) {
        res.status(404).json({ message: 'Location not found' });
        return;
    }

    locationRepository.merge(location, req.body);

    const errors = await validate(location);
    if (errors.length > 0) {
        res.status(400).json({ message: 'Validation failed', errors });
    }

    try {
        await locationRepository.save(location);
        res.json(location);
    } catch (err) {
        console.error('Error updating location:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE: api/locations/:id
export const deleteLocation = async (req: Request, res: Response): Promise<void> => {
    const locationRepository = AppDataSource.getRepository(Location);

    try {
        const result = await locationRepository.delete(req.params.id);
        if (result.affected === 0) {
            res.status(404).json({ message: 'Location not found' });
        }
        res.status(204).json();
    } catch (err) {
        console.error('Error deleting location:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
