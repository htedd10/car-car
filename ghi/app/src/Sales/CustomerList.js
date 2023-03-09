import { React, useEffect, useState } from "react";

function CustomerList(props) {
    const [customers, setCustomers] = useState([]);

    const fetchData = async () => {
        const customersUrl = 'http://localhost:8090/api/customers';
        const customersResponse = await fetch(customersUrl);

        if (customersResponse.ok) {
            const data = await customersResponse.json();
            setCustomers(data.customers);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="my-5 container">
            <h2>Customers</h2>
            <table className="table table-stripped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                </tr>
            </thead>
            <tbody>
                {customers.map(customer => {
                return(
                    <tr key={customer.id}>
                        <td>{customer.name}</td>
                        <td>{customer.address}</td>
                        <td>{customer.phone_number}</td>
                    </tr>
                );
            })}
            </tbody>
            </table>
        </div>
    )
}

export default CustomerList
