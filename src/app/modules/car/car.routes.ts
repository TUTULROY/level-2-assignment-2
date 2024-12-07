import express from 'express';
import { CarControllers } from './car.controller';


const router = express.Router();

// will called controller function
router.post('/create-car', CarControllers.createCar);

router.get('/', CarControllers.getAllCars);

router.get('/:carId', CarControllers.getSingleCars);

router.put('/:carId', CarControllers.updateCar);

router.delete('/:carId', CarControllers.deleteSingleCarFromDb);

export const CarRoutes = router;
