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
            <h2>Vehicle Models</h2>
            <table className="table table-stripped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manufacturer</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {models.map(model => {
                return(
                    <tr key={model.id}>
                        <td>{model.name}</td>
                        <td>{ model.manufacturer.name }</td>
                        <td>
                            <img src={ model.picture_url } className="img-thumbnail"/>
                        </td>
                    </tr>
                );
            })}
            </tbody>
            </table>
        </div>
    );
}

export default VehicleModelList;
