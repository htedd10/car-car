import react from 'react';
import { useEffect, useState } from 'react';

function VehicleModelList(props) {
    const [models, setModels] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [manufacturer, setManufacturer] = useState('');
    const handleManufacturerChange = (event) => {
        const value = event.target.value;
        setManufacturer(value);
    }

    const fetchData = async () => {
        const url = "http://localhost:8100/api/models/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setModels(data.models);
        }

        const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
        const manufacturerResponse = await fetch(manufacturerUrl);
        if (manufacturerResponse.ok) {
            const manufacturerData = await manufacturerResponse.json();
            setManufacturers(manufacturerData.manufacturers);
        }
    }

    useEffect(() => {
        fetchData();
      }, []);

    return (
        <div className="my-5 container">
            <h2>Vehicle Models</h2>
            <select onChange={handleManufacturerChange} value={manufacturer} required id="manufacturers" name="manufacturers" className="form-select">
                <option value="">All Manufacturers</option>
                {manufacturers.map(manufacturer=> {
                        return (
                            <option key={manufacturer.id} value={manufacturer.id}>
                                {manufacturer.name}
                            </option>
                        )
                    })}
            </select>
            <table className="table table-stripped">
            <thead>
                <tr>
                    <th>Manufacturer</th>
                    <th>Name</th>
                    <th>Picture</th>
                </tr>
            </thead>
            <tbody>
                {models.map(model => {
                if (model.manufacturer.id == manufacturer) {
                    return(
                        <tr key={model.id}>
                            <td>{ model.manufacturer.name }</td>
                            <td>{model.name}</td>
                            <td>
                                <img src={ model.picture_url } className="img-thumbnail"/>
                            </td>
                        </tr>
                    );
                } else if (manufacturer == "") {
                    return(
                        <tr key={model.id}>
                            <td>{ model.manufacturer.name }</td>
                            <td>{model.name}</td>
                            <td>
                                <img src={ model.picture_url } className="img-thumbnail"/>
                            </td>
                        </tr>
                    );
                }
            })}
            </tbody>
            </table>
        </div>
    );
}

export default VehicleModelList;
