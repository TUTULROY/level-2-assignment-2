
import { Car } from "./car.interface";
import { CarModel } from "./car.model";



const createCarIntoDB = async (car: Car) => {
  const result = await CarModel.create(car);
  return result;
};

const getAllCarsFromDB = async () => {
  const result = await CarModel.find();
  return result;
};
const getSingleCarFromDB = async (_id: string) => {
  const result = await CarModel.findOne({ _id });
  return result;
};


const updateSingleCarFromDB = async (carId: string, updatedData: any) => {
  // console.log("Updating Car with ID:", carId, "Data:", updatedData);
  try {
    const updatedCar = await CarModel.findByIdAndUpdate(
      carId,
      updatedData,
      { new: true }
    );
    return updatedCar;
  } catch (error) {
    console.error("Error in updateSingleCarFromDB:", error);
    throw new Error('Failed to update car');
  }
};

  
const deleteSingleCarFromDB= async (id: string) => {
  const result = await CarModel.findByIdAndDelete(id);
  return result;
};

export const CarServices = {
  createCarIntoDB,
  getAllCarsFromDB,
  getSingleCarFromDB,
  updateSingleCarFromDB,
  deleteSingleCarFromDB
};
