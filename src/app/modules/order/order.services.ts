

import { CarModel } from "../car/car.model";
import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

const createOrderIntoDb = async (order: Order) => {
  const { car, quantity, email } = order;

  
  console.log('Finding car with ID:', car);
const carData = await CarModel.findById(car);


  if (!carData) {
    throw new Error("Car not found in inventory");
  }

  
  if (carData.quantity === undefined || carData.quantity === null) {
    throw new Error("Car quantity is not defined in the inventory");
  }
  if (carData.quantity < quantity) {
    throw new Error("Insufficient stock");
  }

  
  const price = (carData.price as number) * quantity;

  
  carData.quantity -= quantity;
  if (carData.quantity === 0) {
    carData.inStock = false;
  }

  
  await carData.save();

 
  const orderData = {
    email,
    car,
    quantity,
    price, 
  };

  
  const result = await OrderModel.create(orderData);

  return result;
};


const calculateRevenue = async () => {
  const revenue = await OrderModel.aggregate([
    {
      $lookup: {
        from: "cars",
        localField: "car",
        foreignField: "_id",
        as: "carDetails",
      },
    },
    {
      $unwind: "$carDetails",
    },
    {
      $project: {
        quantity: { $toDouble: "$quantity" }, // Ensure quantity is a number
        carPrice: { $toDouble: "$carDetails.price" }, // Ensure price is a number
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: { $multiply: ["$quantity", "$carPrice"] },
        },
      },
    },
  ]);

  return revenue[0]?.totalRevenue || 0;
};


export const OrderServices = {
  createOrderIntoDb,
  calculateRevenue
};