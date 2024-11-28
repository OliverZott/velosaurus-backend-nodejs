import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Location } from '../entities/location';
import { validate } from 'class-validator';
import { AppDataSource } from '../db/datasource'; s


// GET: api/locations
export const getLocations = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const locationRepository = AppDataSource.getRepository(Location);
        const locations = await locationRepository.find();
        return res.json(locations);
    } catch (err) {
        console.error('Error fetching locations:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// POST: api/locations
export const createLocation = async (req: Request, res: Response): Promise<Response> => {
    const locationRepository = AppDataSource.getRepository(Location);
    const location = locationRepository.create(req.body);

    const errors = await validate(location);
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    try {
        await locationRepository.save(location);
        return res.status(201).json(location);
    } catch (err) {
        console.error('Error creating location:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// PUT: api/locations/:id
export const updateLocation = async (req: Request, res: Response): Promise<Response> => {
    const locationRepository = AppDataSource.getRepository(Location);
    const location = await locationRepository.findOneBy({ id: Number(req.params.id) });

    if (!location) {
        return res.status(404).json({ message: 'Location not found' });
    }

    locationRepository.merge(location, req.body);

    const errors = await validate(location);
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    try {
        await locationRepository.save(location);
        return res.json(location);
    } catch (err) {
        console.error('Error updating location:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE: api/locations/:id
export const deleteLocation = async (req: Request, res: Response): Promise<Response> => {
    const locationRepository = AppDataSource.getRepository(Location);

    try {
        const result = await locationRepository.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Location not found' });
        }
        return res.status(204).json();
    } catch (err) {
        console.error('Error deleting location:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
