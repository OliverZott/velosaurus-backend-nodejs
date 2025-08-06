import express from 'express';
import { getLocations, createLocation, updateLocation, deleteLocation, getLocationById } from '../controllers/locationController';
import { getActivities, createActivity, updateActivity, deleteActivity, getActivitiyById } from '../controllers/activityController';

const router = express.Router();

// Location routes
router.get('/location', getLocations);
router.get('/location/:id', getLocationById);
router.post('/location', createLocation);
router.put('/location/:id', updateLocation);
router.delete('/location/:id', deleteLocation);

// Activity routes
router.get('/activity', getActivities);
router.get('/activity/:id', getActivitiyById);
router.post('/activity', createActivity);
router.put('/activity/:id', updateActivity);
router.delete('/activity/:id', deleteActivity);

export default router;
