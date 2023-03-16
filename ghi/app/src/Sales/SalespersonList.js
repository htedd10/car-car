import { React, useEffect, useState } from "react";

function SalespersonList() {
    const [salespersons, setSalespersons] = useState([])

    const fetchData = async () => {
        const salespersonsUrl = 'http://localhost:8090/api/salesperson';
        const salespersonsResponse = await fetch(salespersonsUrl);

        if (salespersonsResponse.ok) {
            const data = await salespersonsResponse.json();
            setSalespersons(data.salesperson);
        }

    }

    useEffect(() => {
        fetchData();
      }, []);

    return (
        <div className="my-5 container">
        <h2>Salespeople</h2>
        <table className="table table-stripped">
        <thead>
            <tr>
                <th>Name</th>
                <th>Employee Number</th>
            </tr>
        </thead>
        <tbody>
            {salespersons.map(salesperson => {
            return(
                <tr key={salesperson.id}>
                    <td>{salesperson.name}</td>
                    <td>{salesperson.employee_number}</td>
                </tr>
            );
        })}
        </tbody>
        </table>
    </div>
    )

}
export default SalespersonList
