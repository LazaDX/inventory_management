import CardProduct from "../../components/clientlayout/products/CardProduct";
import TitleCardProduct from "../../components/clientlayout/products/components/TitleCardProduct";

function ProductList() {
    return (
        <>
            <div className="ml-60">
                <TitleCardProduct />
                <CardProduct />
            </div>
        </>
    )
}

export default ProductList;