import { React, useEffect, useState } from "react";

function SalesRecordList() {
    const [salespersons, setSalespersons] = useState([]);
    const [salesperson, setSalesperson] = useState('');
    const handleSalespersonChange = (event) => {
        const value = event.target.value;
        setSalesperson(value);
    }

    const [salespersonRecords, setSalespersonRecords] = useState([]);

    const fetchData = async () => {
        const salespersonUrl = 'http://localhost:8090/api/salesperson';
        const salespersonResponse = await fetch(salespersonUrl);

        if (salespersonResponse.ok) {
            const data = await salespersonResponse.json();
            setSalespersons(data.salesperson);
        }

        const salespersonRecordUrl = 'http://localhost:8090/api/salerecords/';
        const salespersonRecordResponse = await fetch(salespersonRecordUrl);

        if (salespersonRecordResponse.ok) {
            const recorddata = await salespersonRecordResponse.json();
            setSalespersonRecords(recorddata.Salerecords);
        }
    }

    useEffect(() => {
        fetchData();
      }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm">
                <h2>List of Sales</h2>
                <select onChange={handleSalespersonChange} value={salesperson} required id="salespersons" name="salespersons" className="form-select">
                    <option value="">All Sales</option>
                    {salespersons.map(saleperson => {
                        return (
                            <option key={saleperson.id} value={saleperson.id}>
                                {saleperson.name}
                            </option>
                        )
                    })}
                  </select>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Salesperson</th>
                            <th>Customer</th>
                            <th>Automobile</th>
                            <th>Sale Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salespersonRecords.map(salespersonRecord => {
                            if (salespersonRecord.salesperson.id == salesperson) {
                                return (
                                    <tr key={salespersonRecord.id}>
                                        <td>{salespersonRecord.salesperson.name}</td>
                                        <td>{salespersonRecord.customer.name}</td>
                                        <td>{salespersonRecord.automobile.vin}</td>
                                        <td>${salespersonRecord.sales_price}</td>
                                    </tr>
                                );
                            } else if (salesperson == "") {
                                return (
                                    <tr key={salespersonRecord.id}>
                                        <td>{salespersonRecord.salesperson.name}</td>
                                        <td>{salespersonRecord.customer.name}</td>
                                        <td>{salespersonRecord.automobile.vin}</td>
                                        <td>${salespersonRecord.sales_price}</td>
                                    </tr>
                                );
                            }
                            })}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        );
}

export default SalesRecordList
