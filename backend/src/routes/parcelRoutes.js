const express = require('express');
const parcelController = require('../controllers/parcelController');
const router = express.Router();

router.post('/', parcelController.createParcel);
router.get('/:id', parcelController.getParcelById);
router.get('/', parcelController.getAllParcels);
router.put('/:id', parcelController.updateParcel);
router.delete('//:id', parcelController.deleteParcel);

module.exports = router; 
