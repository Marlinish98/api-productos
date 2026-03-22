import type { ProductListProps } from "../Interfaz/productListProps";

const ProductList: React.FC<ProductListProps> = ({
  productos,
  handleEdit,
  handleDelete,
  loading,
}) => {
  return (
    <div className="max-w-6xl mx-auto my-6 ">
      <h2 className="text-2xl font-bold mb-6 text-center bg-blue-800 p-3 rounded-2xl text-white">Lista de Productos</h2>

      {loading ? (
        <div className="text-center text-gray-500">Cargando productos...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 space-x-1">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold mb-2">{producto.title}</h3>
                <p className="text-gray-700 mb-4">Precio: ${producto.price}</p>
                <p className="text-gray-600 text-sm">{producto.description}</p>
                <p>Categoria: {producto.category.name}</p>
                <p className="text-gray-500 text-xs mt-2">Creado: {new Date(producto.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-500 text-xs">Actualizado: {new Date(producto.updatedAt).toLocaleDateString()}</p>
                
                <div>

                  {producto.images && producto.images.length > 0 ? (
                    <img
                      src={producto.images[0]}
                      alt={producto.title}
                      className="w-full h-48 object-cover mt-2 rounded"
                    />
                  ) : (
                    <p className="text-gray-500 mt-2">No hay imagen disponible</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => handleEdit(producto)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(producto.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition "
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;