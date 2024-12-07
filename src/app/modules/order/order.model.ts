import { Schema, model } from "mongoose";
import { Order } from "./order.interface";

const orderSchema = new Schema<Order>({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    car: {
    type: Schema.Types.ObjectId,
    
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
    min: [1, "Quantity must be at least 1"],
  },

  price: {
    type: Number,
    required: true,
    min: [0, "Total price cannot be negative"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const OrderModel = model<Order>('Order', orderSchema);
