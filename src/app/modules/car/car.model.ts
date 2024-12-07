import { Schema, model } from 'mongoose';
import { Car } from './car.interface';


const carSchema = new Schema<Car>({
  id:{
    type: String, 
    required: true, 
    unique: true
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
  },
  model: {
    type: String,
    required: [true, 'Model is required'],
  },
  year: {
    type: String,
    required: [true, 'Year is required'],
    min: [1886, 'Year must be no earlier than 1886'], // Earliest car invention
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive value'],
  },
  category: {
    type: String,
    enum: {
      values: ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
      message: '{VALUE} is not a valid category',
    },
    required: [true, 'Category is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [0, 'Quantity must be a positive value'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'In-stock status is required'],
    default: true,
  },
});

export const CarModel = model<Car>('Car', carSchema);
