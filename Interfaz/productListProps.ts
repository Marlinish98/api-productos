import type { InfoProductos } from "./infoProductos";

export interface ProductListProps {
    productos: InfoProductos[];
    handleEdit: (product: InfoProductos) => void;
    handleDelete: (id: number) => void;
    loading: boolean;
}