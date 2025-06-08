import OrderProduct from "../../components/clientlayout/orders/OrderProduct";
import TitleOrderProduct from "../../components/clientlayout/orders/components/TitleOrderProduct";
function Orders() {
    return (
        <>
            <div className="ml-60">
                <TitleOrderProduct />
                <OrderProduct />
            </div>
        </>
    );
}

export default Orders;