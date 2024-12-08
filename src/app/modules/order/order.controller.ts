import { Request, Response } from 'express';
import { OrderServices } from './order.services';


const createOrder = async (req: Request, res: Response)=> {
  try {
    console.log("Request Body:", req.body);

    const { order } = req.body; 
    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Order data is required",
      });
    }

    const { email, car, quantity, totalPrice } = order;

    if (!email || !car || !quantity || !totalPrice) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: email, car, quantity, or totalPrice",
      });
    }

    const orderData = {
      email,
      car,
      quantity,
      price: totalPrice, 
    };

    const result = await OrderServices.createOrderIntoDb(orderData);

    res.status(200).json({
      message: "Order created successfully",
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};



const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const revenue = await OrderServices.calculateRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: {
        totalRevenue: revenue,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error calculating revenue',
      
    });
  }
};


export const OrderControllers = {
  createOrder,
  calculateRevenue
};