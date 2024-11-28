import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Activity } from '../entities/activity';
import { validate } from 'class-validator';
import { AppDataSource } from '../db/datasource';

// GET: api/activities
export const getActivities = async (req: Request, res: Response): Promise<Response> => {
    try {
        const activityRepository = AppDataSource.getRepository(Activity);
        const activities = await activityRepository.find();
        return res.json(activities);
    } catch (err) {
        console.error('Error fetching activities:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// POST: api/activities
export const createActivity = async (req: Request, res: Response): Promise<Response> => {
    const activityRepository = AppDataSource.getRepository(Activity);
    const activity = activityRepository.create(req.body);

    const errors = await validate(activity);
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    try {
        await activityRepository.save(activity);
        return res.status(201).json(activity);
    } catch (err) {
        console.error('Error creating activity:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// PUT: api/activities/:id
export const updateActivity = async (req: Request, res: Response): Promise<Response> => {
    const activityRepository = AppDataSource.getRepository(Activity);
    const activity = await activityRepository.findOneBy({ id: Number(req.params.id) });

    if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
    }

    activityRepository.merge(activity, req.body);

    const errors = await validate(activity);
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    try {
        await activityRepository.save(activity);
        return res.json(activity);
    } catch (err) {
        console.error('Error updating activity:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE: api/activities/:id
export const deleteActivity = async (req: Request, res: Response): Promise<Response> => {
    const activityRepository = AppDataSource.getRepository(Activity);

    try {
        const result = await activityRepository.delete(req.params.id);
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        return res.status(204).json();
    } catch (err) {
        console.error('Error deleting activity:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
