import { React, useEffect, useState } from "react";

function SalesRecordList(props) {
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
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Salesperson</th>
                            <th>Employee Number</th>
                            <th>Customer</th>
                            <th>Automobile</th>
                            <th>Sale Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {salespersonRecords.map(salespersonRecord => {
                        return (
                        <tr key={salespersonRecord.id}>
                            <td>{ salespersonRecord.salesperson.name }</td>
                            <td>{ salespersonRecord.salesperson.employee_number }</td>
                            <td>{ salespersonRecord.customer.name }</td>
                            <td>{ salespersonRecord.automobile.vin }</td>
                            <td>${ salespersonRecord.sales_price }</td>
                        </tr>
                        );
                    })}
                    </tbody>
                </table>
                </div>
                <div className="col-sm">
                <h2>Salesperson History</h2>
                <select onChange={handleSalespersonChange} value={salesperson} required id="salespersons" name="salespersons" className="form-select">
                    <option value="">Choose a salesperson</option>
                    {salespersons.map(saleperson => {
                        return (
                            <option key={saleperson.id} value={saleperson.id}>
                                {saleperson.employee_number}
                            </option>
                        )
                    })};
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
                        {salespersonRecords.filter(salespersonRecord => salespersonRecord.salesperson.id == salesperson).map(salespersonRecord => {
                            return (
                                <tr key={salespersonRecord.id}>
                                    <td>{salespersonRecord.salesperson.name}</td>
                                    <td>{salespersonRecord.customer.name}</td>
                                    <td>{salespersonRecord.automobile.vin}</td>
                                    <td>${salespersonRecord.sales_price}</td>
                                </tr>
                            );
                            })}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        );
}

export default SalesRecordList
