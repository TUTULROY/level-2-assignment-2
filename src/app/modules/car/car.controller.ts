import { Request, Response } from 'express';
import { CarServices } from './car.services';


const createCar = async (req: Request, res: Response) => {
  try {
    const { car: carData } = req.body;

    const result = await CarServices.createCarIntoDB(carData);

    res.status(200).json({
      success: true,
      message: 'Car is created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
    
  }
};

const getSingleCars = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await CarServices.getSingleCarFromDB(carId);
    res.status(200).json({
      success: true,
      message: 'Cars is retrieved successfully ',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getAllCars = async (req: Request, res: Response) => {
  try {
    const result = await CarServices.getAllCarsFromDB();
    res.status(200).json({
      success: true,
      message: 'Cars are retrieved successfully ',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateCar = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { carId } = req.params;
    const { car } = req.body; 

    console.log("Car ID:", carId);
    console.log("Request Body:", req.body);

    if (!car) {
    res.status(400).json({
        success: false,
        message: 'Please provide car data to update',
      });
    }

    const { price, quantity } = car;

    if (price === undefined && quantity === undefined) {
        res.status(400).json({
        success: false,
        message: 'Please provide price or quantity to update',
      });
    }

    const updatedData: any = {};
    if (price !== undefined) updatedData.price = price;
    if (quantity !== undefined) updatedData.quantity = quantity;

    const result = await CarServices.updateSingleCarFromDB(carId, updatedData);

    if (!result) {
        res.status(404).json({
        success: false,
        message: 'Car not found',
      });
    }

    res.status(200).json({
      message: 'Car updated successfully',
      success: true,
      data: result,
      timeStamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Update Error:", error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
    });
  }
};

const deleteSingleCarFromDb = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await CarServices.deleteSingleCarFromDB(carId);
    res.status(200).json({
      success: true,
      message: 'Car Delete successfully ',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};


export const CarControllers = {
  createCar,
  getAllCars,
  getSingleCars,
  updateCar,
  deleteSingleCarFromDb
};
