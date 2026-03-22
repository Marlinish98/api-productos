import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import type { InfoProductos } from "../Interfaz/infoProductos";
import type { userAPI } from "../Interfaz/userAPI";

const useProductos = () => {
  const [productos, setProductos] = useState<userAPI[]>([]);
  const [productToEdit, setProductToEdit] = useState<userAPI | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [infoProductos, setInfoProductos] = useState<InfoProductos>({
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: { id: 0, name: "", image: "", slug: "" },
    images: [],
  });

  const API_URL = "https://api.escuelajs.co/api/v1/products";

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await axios.get<userAPI[]>(API_URL);
      setProductos(response.data);
    } catch {
      Swal.fire({ icon: "error", text: "Falla en carga de producto, intente más tarde" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInfoProductos((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : name === "images" ? [value] : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        title: infoProductos.title,
        price: infoProductos.price,
        description: infoProductos.description,
        categoryId: infoProductos.category.id || 1,
        images: infoProductos.images.length > 0 ? infoProductos.images : ["https://placeimg.com/640/480/any"],
      };

      if (productToEdit) {
        await axios.put(`${API_URL}/${productToEdit.id}`, productData);
        Swal.fire({ icon: "success", title: "Éxito", text: "Producto editado con éxito" });
      } else {
        await axios.post(API_URL, productData);
        Swal.fire({ icon: "success", title: "Éxito", text: "Producto creado con éxito" });
      }

      setInfoProductos({
        id: 0,
        title: "",
        price: 0,
        description: "",
        category: { id: 0, name: "", image: "", slug: "" },
        images: [],
      });

      setProductToEdit(null);
      await fetchProductos();
    } catch {
      Swal.fire({ icon: "error", text: "Error al guardar el producto, intente más tarde" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: userAPI): void => {
    setProductToEdit(product);
    setInfoProductos({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      images: product.images,
    });
  };

  const handleDelete = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo!",
      });

      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/${id}`);
        Swal.fire({ icon: "success", title: "Éxito", text: "Producto eliminado con éxito" });
        await fetchProductos();
      }
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
    handleSubmit,
    handleEdit,
    handleDelete,
    setProductToEdit,
  };
};

export default useProductos;