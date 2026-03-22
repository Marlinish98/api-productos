import type { InfoProductos } from "./infoProductos";

export interface useFormProps {
    infoProductos: InfoProductos;
    setInfoProductos: React.Dispatch<React.SetStateAction<InfoProductos>>;
    // tipo de Evento de formulario
    handleInputChange: (e: React.ChangeEvent<HTMLFormElement>) => void;
    handlesubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    productToEdit: any;
    setProductToEdit: React.Dispatch<React.SetStateAction<any>>;
    loading: boolean;
}