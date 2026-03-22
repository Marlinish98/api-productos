import type { userAPI } from "./userAPI"; 

export interface ProductListProps {
    productos: userAPI[]; 
    handleEdit: (product: userAPI) => void;
    handleDelete: (id: number) => void;
    loading: boolean;
}