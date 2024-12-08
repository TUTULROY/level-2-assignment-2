import { Types } from "mongoose";

export type Order = {
    email: string;
    car?: Types.ObjectId;
    quantity: number;
    price?: number;
    createdAt?: Date;
}