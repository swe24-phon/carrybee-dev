const driverService = require('../services/driverService')

const createDriver = async (req, res) => {
    try {
      const newDriver = await driverService.createDriver(req.body);
      res.status(201).json(newDriver);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

const getDriverByAvailability = async (req, res) => {
    try {
      const driver = await driverService.getDriverByAvailability(req.params.availability);
      res.status(200).json(driver);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
};

const getAllDrivers = async (req, res) => {
    try {
      const drivers = await driverService.getAllDrivers();
      res.status(200).json(drivers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const updateDriver = async (req, res) => {
    try {
      const updatedDriver = await driverService.updateDriver(req.params.id, req.body);
      res.status(200).json(updatedDriver);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

const deleteDriver = async (req, res) => {
    try {
      const deletedMessage = await driverService.deleteDriver(req.params.id);
      res.status(200).json(deletedMessage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createDriver,
    getDriverByAvailability,
    getAllDrivers,
    updateDriver,
    deleteDriver,
};