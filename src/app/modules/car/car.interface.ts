export type Car = {
  id: string;
  brand: string;
  model: string;
  year: string;
  price?: number;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';
  description: string;
  quantity?: number;
  inStock: boolean; 
}


