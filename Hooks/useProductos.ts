import { useState, useEffect, type ChangeEvent, type FormEvent, use } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import type { InfoProductos } from "../Interfaz/infoProductos";
import type { userAPI } from "../Interfaz/userAPI";
import { info } from "node:console";
import { title } from "node:process";

const useProductos = () => {
    const [productos, setProductos] = useState<userAPI[]>([]);
    const [[productToEdit, setProductToEdit], setProductToEditState] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [infoProductos, setInfoProductos] = useState<InfoProductos>({
        title: "",
        price: 0,
        description: "",
        category: 0,
        image: [],
    });

    const API_URL = 'https://api.escuelajs.co/api/v1/products';

    const fetchProductos = async () => {
        setLoading(true);
        try {
            const response = await axios.get<userAPI[]>(API_URL);
            setProductos(response.data);
        } catch (error) {
            errorAlert("Falla en carga de producto, intente mas tarde");
        } finally {
            setLoading(false);
        }
    };

    const SuccesAlert = (message: string): void => {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: message,
        });
    }

    const errorAlert = (message: string): void => {
        Swal.fire({
            icon: 'error',
            text: message,
        });
    }

    useEffect(() => {
        fetchProductos();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;

        // Lo que trae el formulario
        setInfoProductos((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);

        try {
            if (productToEdit) {
                await axios.put(`${API_URL}/${productToEdit.id}`, {
                    title: infoProductos.title,
                    price: infoProductos.price,
                });
                SuccesAlert("Producto editado con éxito");
            } else {
                await axios.post(API_URL, {
                    ...infoProductos,

                });
                SuccesAlert("Producto creado con éxito");
            }
            setInfoProductos({
                title: "",
                price: 0,
                description: "",
                category: 0,
                image: [],
            })

            setProductToEdit(null);
            await fetchProductos();
        }
        catch (error) {
            errorAlert("Error al guardar el producto, intente más tarde");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (product: userAPI): void => {
        setProductToEdit(product);
        setInfoProductos({
            title: product.title,
            price: product.price,
            description: product.description || "",
            category: 0,
            image:[],
        });
    }

    const handleDelete = async (id: number): Promise<void> => {
        setLoading(true);
        try{
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo!'
            });

            if (result.isConfirmed) {
                await axios.delete(`${API_URL}/${id}`);
                SuccesAlert("Producto eliminado con éxito");
                await fetchProductos();
            }
        } catch (error) {
            errorAlert("Error al eliminar el producto, intente más tarde");
        } finally {
            setLoading(false);
        }
    };

    return {
        productos,
        loading,
        infoProductos,
        setInfoProductos,
        handleInputChange,
        productToEdit,
        setProductToEditState,
        handleSubmit,
        handleEdit,
        handleDelete,
    }


};

export default useProductos;
