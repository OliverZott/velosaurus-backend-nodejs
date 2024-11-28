import express, { Router } from 'express';
import { getLocations, createLocation, updateLocation, deleteLocation } from '../controllers/locationController';
import { getActivities, createActivity, updateActivity, deleteActivity } from '../controllers/activityController';

const router = express.Router();

// Location routes
router.get('/location', getLocations);
router.post('/location', createLocation);
router.put('/location/:id', updateLocation);
router.delete('/location/:id', deleteLocation);

// Activity routes
router.get('/activity', getActivities);
router.post('/activity', createActivity);
router.put('/activity/:id', updateActivity);
router.delete('/activity/:id', deleteActivity);

export default router;
