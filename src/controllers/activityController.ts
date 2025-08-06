import { Request, Response } from 'express';
import { Activity } from '../entities/activity';
import { validate } from 'class-validator';
import { AppDataSource } from '../db/datasource';
import { mapToActivityDto } from '../dtos/actifityDto';
import { PagedResponse } from '../dtos/pagedResponse';
import { PaginationMetadata } from '../dtos/paginationMetadata';

// GET: api/activities
export const getActivities = async (req: Request, res: Response): Promise<void> => {
    try {
        const activityRepository = AppDataSource.getRepository(Activity);
        const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : null;
        const pageSize = req.query.pageSize ? Number(req.query.pageSize) : null;

        let activities = [];

        if (pageNumber && pageSize) {

            activities = await activityRepository.find({
                skip: Number((pageNumber - 1) * pageSize),
                take: pageSize,
            });
            const pageCount = Math.ceil(activities.length / pageSize);

            const paginationMetadata: PaginationMetadata = {
                TotalItems: activities.length,
                PageSize: pageSize,
                CurrentPage: pageNumber,
                TotalPages: pageCount,
                HasNextPage: pageNumber < pageCount,
                HasPreviousPage: pageNumber > 1,
            };

            const pagedResponse: PagedResponse<Activity> = {
                items: activities,
                metadata: paginationMetadata
            }

            res.json(pagedResponse);
        } else {
            activities = await activityRepository.find();
            res.json(activities);
        }
    } catch (err) {
        console.error('Error fetching activities:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// GET: api/activities/:id
export const getActivitiyById = async (req: Request, res: Response): Promise<void> => {
    const activityRepository = AppDataSource.getRepository(Activity);
    const activity = await activityRepository.findOne({
        where: { id: Number(req.params.id) },
        relations: ['location']
    });

    if (!activity) {
        res.status(404).json({ message: 'Activity not found' });
        return;
    }

    const activityDTO = mapToActivityDto(activity);

    res.json(activityDTO);
}

// POST: api/activities
export const createActivity = async (req: Request, res: Response): Promise<void> => {
    const activityRepository = AppDataSource.getRepository(Activity);

    // Parse date string to Date object
    if (req.body.date) {
        req.body.date = new Date(req.body.date);
    }

    const activity = activityRepository.create(req.body);

    //Validate properties
    const errors = await validate(activity);
    if (errors.length > 0) {
        res.status(400).json({ message: 'Validation failed', errors });
        return;
    }

    try {
        await activityRepository.save(activity);
        res.status(201).json(activity);
    } catch (err) {
        console.error('Error creating activity:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// PUT: api/activities/:id
export const updateActivity = async (req: Request, res: Response): Promise<void> => {
    const activityRepository = AppDataSource.getRepository(Activity);
    const activity = await activityRepository.findOneBy({ id: Number(req.params.id) });

    if (!activity) {
        res.status(404).json({ message: 'Activity not found' });
        return;
    }

    activityRepository.merge(activity, req.body);

    const errors = await validate(activity);
    if (errors.length > 0) {
        res.status(400).json({ message: 'Validation failed', errors });
    }

    try {
        await activityRepository.save(activity);
        res.json(activity);
    } catch (err) {
        console.error('Error updating activity:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETE: api/activities/:id
export const deleteActivity = async (req: Request, res: Response): Promise<void> => {
    const activityRepository = AppDataSource.getRepository(Activity);

    try {
        const result = await activityRepository.delete(req.params.id);
        if (result.affected === 0) {
            res.status(404).json({ message: 'Activity not found' });
        }
        res.status(204).json();
    } catch (err) {
        console.error('Error deleting activity:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
