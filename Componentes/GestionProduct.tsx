import ProductForm from "./productForm";
import ProductList from "./productList";
import useProductos from "../Hooks/useProductos";   

const GestionProduct: React.FC = () => {
    const {
        productos,
        loading,
        infoProductos,
        setProductToEdit,
        setInfoProductos,
        handleInputChange,
        productToEdit,
        handleSubmit,
        handleEdit,
        handleDelete,
    } = useProductos();

    return (
      <div>
        <h1>Gestión de Productos</h1>
       <ProductForm
  infoProductos={infoProductos}
  setInfoProductos={setInfoProductos}
  handleInputChange={handleInputChange}
  handleSubmit={handleSubmit}
  productToEdit={productToEdit}
  setProductToEdit={setProductToEdit} 
  loading={loading}
/>
        <ProductList
          productos={productos}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          loading={loading}
        />
      </div>  
    );
};

export default GestionProduct;