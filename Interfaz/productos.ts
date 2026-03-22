import { categoria } from "./categoria";

export interface Productos {
    id: number;
    title: string;
    slug: string;
    price:number;
    description: string;
    category: categoria;
    image: [];
}