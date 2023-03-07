import react from 'react';
import { useEffect, useState } from 'react';

function VehicleModelList(props) {
    const [models, setModels] = useState([]);
    const fetchData = async () => {
        const url = "http://localhost:8100/api/models/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }
    }

    useEffect(() => {
        fetchData();
      }, []);


    return (
        <div className="my-5 container">
            <table className="table table-stripped">
            <thead>
                <tr>
                <th>Model Name</th>
                <th>color </th>
                <th>year</th>
                <th>manufacturer</th>
                <th>Vin Number</th>
                </tr>
            </thead>
            <tbody>
                {models.map(model => {
                return(
                    <tr key={model.id}>
                    <td>{model.name}</td>
                    <td>{ model.color }</td>
                    <td>{ model.year }</td>
                    <td>{ model.manufacturer.name}</td>
                    <td>{ model.vin}</td>

                    </tr>
                );
            })}
            </tbody>
            </table>
        </div>
    );
}

export default VehicleModelList;
