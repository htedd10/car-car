import { React, useEffect, useState } from "react";

function SalesPersonCreateForm() {
    const [automobileVOs, setAutomobileVOs] = useState([]);
    const [automobile, setAutomobileVO] = useState('');
    const handleAutomobileChange = (event) => {
        const value = event.target.value;
        setAutomobileVO(value);
    }

    const [salespersons, setSalespersons] = useState([]);
    const [salesperson, setSalesperson] = useState('');
    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    }

    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState('');
    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const [sales_price, setSalesPrice] = useState('');
    const handleSalesPriceChange = (event) => {
        const value = event.target.value;
        setSalesPrice(value);
    }

    const [salerecords, setSalerecords] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            automobile,
            salesperson,
            customer,
            sales_price,
        }

        const salesrecordUrl = 'http://localhost:8090/api/salerecords/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch (salesrecordUrl, fetchConfig);
        if (response.ok) {
            const newSalesrecord = await response.json();

            fetchData();
            setSalesperson('');
            setAutomobileVO('');
            setSalesPrice('');
            setCustomer('');
        }

    }

    const fetchData = async () => {
        const automobileUrl = 'http://localhost:8090/api/automobiles';
        const automobileResponse = await fetch(automobileUrl);

        if (automobileResponse.ok) {
            const automobileData = await automobileResponse.json();
            setAutomobileVOs(automobileData.automobileVOs);
        }

        const salespersonUrl = 'http://localhost:8090/api/salesperson';
        const salespersonResponse = await fetch(salespersonUrl);
        if (salespersonResponse.ok) {
            const salespersonData = await salespersonResponse.json();
            setSalespersons(salespersonData.salesperson);
        }

        const customerUrl = 'http://localhost:8090/api/customers';
        const customerResponse = await fetch(customerUrl);
        if (customerResponse.ok) {
            const customerData = await customerResponse.json();
            setCustomers(customerData.customers);
        }

        const salerecordsUrl = 'http://localhost:8090/api/salerecords/';
        const salerecordsResponse = await fetch(salerecordsUrl);
        if (salerecordsResponse.ok) {
            const salerecordsData = await salerecordsResponse.json();
            setSalerecords(salerecordsData.Salerecords)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container">
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Record a new sale</h1>
              <form onSubmit={handleSubmit} id="create-salesrecord-form">
                <div className="mb-3">
                  <select onChange={handleAutomobileChange} value={automobile} required id="automobile" name="automobile" className="form-select">
                    <option value="">Choose an automobile</option>
                    {automobileVOs.map(automobile => {
                        const soldInventory = [];
                        for (let salerecord of salerecords) {
                            soldInventory.push(salerecord.automobile.vin);
                        }
                        if (!soldInventory.includes(automobile.vin)) {
                            return (
                                <option key={automobile.vin} value={automobile.vin}>
                                    {automobile.vin}
                                </option>
                            )
                        }
                    })};
                  </select>
                </div>
                <div className="mb-3">
                  <select onChange={handleSalespersonChange} value={salesperson} required id="salesperson" name="salesperson" className="form-select">
                    <option value="">Choose a sales person</option>
                    {salespersons.map(salesperson => {
                        return (
                            <option key={salesperson.id} value={salesperson.id}>
                                {salesperson.name}
                            </option>
                        )
                    })};
                  </select>
                  </div>
                  <div className="mb-3">
                    <select onChange={handleCustomerChange} value={customer} required id="customer" name="customer" className="form-select">
                        <option value="">Choose a customer</option>
                        {customers.map(customer => {
                            return (
                                <option key={customer.id} value={customer.id}>
                                    {customer.name}
                                </option>
                            )
                        })};
                    </select>
                  </div>
                <div className="form-floating mb-3">
                  <input onChange={handleSalesPriceChange} value={sales_price} placeholder="Sales_price" required type="number" name="sales_price" id="sales_price" className="form-control"/>
                  <label htmlFor="sales_price">Sales price</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default SalesPersonCreateForm
