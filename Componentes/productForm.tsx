import type { UserFormProps } from "../Interfaz/UserFormProps";

const ProductForm: React.FC<UserFormProps> = ({
    infoProductos,
    handleInputChange,
    handleSubmit,
    productToEdit,
    setProductToEdit,
    loading,
}) => {
    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 my-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
                {infoProductos.id ? "Editar Producto" : "Agregar Producto"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Título"
                    value={infoProductos.title}
                    onChange={handleInputChange}
                    required
                    disabled={!!productToEdit}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    value={infoProductos.price}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Descripción"
                    value={infoProductos.description}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="number"
                    name="category"
                    placeholder="Categoría"
                    value={infoProductos.category.id}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="text"
                    name="images"
                    placeholder="URL de la imagen"
                    value={infoProductos.images && infoProductos.images[0] ? infoProductos.images[0] : ""}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />



                <div className="flex justify-between items-center">
                    {productToEdit && (
                        <button
                            type="button"
                            onClick={() => setProductToEdit(null)}
                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                        >
                            Cancelar
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-4 py-2 w-full rounded text-white transition ${loading
                                ? "bg-green-400 cursor-not-allowed"
                                : "bg-green-800 hover:bg-`green-100"
                            }`}
                    >
                        {infoProductos.id ? "Actualizar" : "Crear"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;