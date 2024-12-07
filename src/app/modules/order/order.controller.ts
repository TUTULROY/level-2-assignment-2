import { Request, Response } from 'express';
import { OrderServices } from './order.services';


const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;

    const result =
      await OrderServices.createOrderIntoDb(orderData);

    
     res.status(200).json({
      message: 'Order created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
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