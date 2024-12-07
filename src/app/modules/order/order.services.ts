
import { CarModel } from "../car/car.model";
import { Order } from "./order.interface";
import { OrderModel } from "./order.model";



const createOrderIntoDb = async (order: Order) => {
  const { car, quantity } = order;


  const carData = await CarModel.findById(car);

  if (!carData) {
    throw new Error("Car not found in inventory");
  }

  if (carData.quantity === undefined) {
  throw new Error("Car quantity is not defined");
  }


  if (carData.quantity < quantity) {
    throw new Error("Insufficient stock");
  }

  
  carData.quantity -= quantity;
  if (carData.quantity === 0) {
    carData.inStock = false;
  }
  await carData.save();

  
  const result = await OrderModel.create(order);

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
        quantity: { $toDouble: "$quantity" }, 
        carPrice: { $toDouble: "$carDetails.price" }, 
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