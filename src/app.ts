import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { CarRoutes } from './app/modules/car/car.routes';
import { OrderRoutes } from './app/modules/order/order.routes';



const app: Application = express();


app.use(express.json());
app.use(cors());


app.use('/api/cars', CarRoutes);
app.use('/api/orders', OrderRoutes);

const getController = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', getController);

export default app;
