import { Outlet } from "react-router-dom"
import "../../css/pages/product/product.css"
const ProductDetailContainer = () => {
    
    return (
        <div className="productDetail__container">
            <Outlet />
        </div>
    );
};

export default ProductDetailContainer;
