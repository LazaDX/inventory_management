import TableCustomer from "../../components/adminlayout/customer/TableCustomer";
import TitleCustomer from "../../components/adminlayout/customer/components/TitleCustomer";

function Customer() {
    return (
        <>
            <div className="ml-60">
                <TitleCustomer />
                <TableCustomer />
            </div>
        </>
    );
}

export default Customer;