import { React, useEffect, useState } from "react";

function AutomobileList(props) {
    const [automobiles, setAutomobiles] = useState([]);

    const fetchData = async() => {
        const response = await fetch ('http://localhost:8100/api/automobiles/');
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
        }
    }

    useEffect(() => {
        fetchData();
      }, []);

    return (
        <div className="container">
        <h2>Vehicle Models</h2>
        <div className="row">
            <div className="col-sm">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>VIN</th>
                    <th>Color</th>
                    <th>Year</th>
                    <th>Model</th>
                    <th>Manufacturer</th>
                </tr>
                </thead>
                <tbody>
                {automobiles.map(automobile => {
                    return (
                    <tr key={automobile.id}>
                        <td>{automobile.vin}</td>
                        <td>{automobile.color}</td>
                        <td>{automobile.year}</td>
                        <td>{automobile.model.name}</td>
                        <td>{automobile.model.manufacturer.name}</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            </div>
            <div className="col-sm">
            </div>
        </div>
    </div>
    )
}
export default AutomobileList
