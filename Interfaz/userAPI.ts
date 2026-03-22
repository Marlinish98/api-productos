import type { categoria } from "./categoria";

export interface userAPI {
    id: number;
    title: string;
    slug: string;
    price:number;
    description: string;
    category: categoria;
    images: string[];
    createdAt: string;
    updatedAt: string;
}