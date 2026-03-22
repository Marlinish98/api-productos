import type { InfoProductos } from "./infoProductos";

export interface UserFormProps {
    infoProductos: InfoProductos;
    setInfoProductos: React.Dispatch<React.SetStateAction<InfoProductos>>;
    // tipo de Evento de formulario
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    productToEdit: any;
    setProductToEdit: React.Dispatch<React.SetStateAction<any>>;
    loading: boolean;
}