import type { categoria } from "./categoria";

export interface InfoProductos {
  id: number;
  title: string;
  price: number;
  description: string;
  category: categoria;
  images: string[];
  createdAt?: string; 
  updatedAt?: string;
}