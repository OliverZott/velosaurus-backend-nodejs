import express, { Router } from 'express';
import { getLocations, createLocation, updateLocation, deleteLocation } from '../controllers/locationController';
import { getActivities, createActivity, updateActivity, deleteActivity } from '../controllers/activityController';

const router = express.Router();

// Location routes
router.get('/locations', getLocations);
router.post('/locations', createLocation);
router.put('/locations/:id', updateLocation);
router.delete('/locations/:id', deleteLocation);

// Activity routes
router.get('/activities', getActivities);
router.post('/activities', createActivity);
router.put('/activities/:id', updateActivity);
router.delete('/activities/:id', deleteActivity);

export default router;
