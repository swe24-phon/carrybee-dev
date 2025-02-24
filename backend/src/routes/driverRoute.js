const express = require('express');
const driverController = require('../controllers/driverController');
const router = express.Router();

router.post('/drivers', driverController.createDriver);
router.get('/drivers/:availability', driverController.getDriverByAvailability)
router.get('/drivers/', driverController.getAllDrivers)
router.put('/drivers/:id', driverController.updateDriver)
router.delete('/drivers/', driverController.deleteDriver)
