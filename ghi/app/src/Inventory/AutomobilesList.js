import { React, useEffect, useState } from "react";

function AutomobileList() {
    const [automobiles, setAutomobiles] = useState([]);
    const [salerecords, setSalerecords] = useState([]);

    const [select, setSelect] = useState('');
    const handleSelectChange = (event) => {
        const value = event.target.value;
        setSelect(value);
    }

    const fetchData = async() => {
        const response = await fetch ('http://localhost:8100/api/automobiles/');
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
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
            <div className="col-sm">
            <h2>Automobiles</h2>
            <select onChange={handleSelectChange} value={select} required id="automobiles" name="automobiles" className="form-select">
                    <option value="">All</option>
                    <option value="in-stock">In-Stock</option>
                    <option value="sold">Sold</option>
            </select>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Picture</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {automobiles.map(automobile => {
                        const soldInventory = [];
                        for (let salerecord of salerecords) {
                            soldInventory.push(salerecord.automobile.vin)
                        }
                        if (select=="") {
                            return (
                                <tr key={automobile.id}>
                                    <td>{automobile.vin}</td>
                                    <td>
                                        <img src={ automobile.picture_url } className="img-thumbnail"/>
                                    </td>
                                    <td>{automobile.color}</td>
                                    <td>{automobile.year}</td>
                                    <td>{automobile.model.name}</td>
                                    <td>{automobile.model.manufacturer.name}</td>
                                </tr>
                            );
                        } else if (select=="sold") {
                            if (soldInventory.includes(automobile.vin)) {
                                return (
                                    <tr key={automobile.id}>
                                        <td>{automobile.vin}</td>
                                        <td>
                                            <img src={ automobile.picture_url } className="img-thumbnail"/>
                                        </td>
                                        <td>{automobile.color}</td>
                                        <td>{automobile.year}</td>
                                        <td>{automobile.model.name}</td>
                                        <td>{automobile.model.manufacturer.name}</td>
                                    </tr>
                                );
                            }
                        } else {
                            if (!(soldInventory.includes(automobile.vin))) {
                                return (
                                    <tr key={automobile.id}>
                                        <td>{automobile.vin}</td>
                                        <td>
                                            <img src={ automobile.picture_url } className="img-thumbnail"/>
                                        </td>
                                        <td>{automobile.color}</td>
                                        <td>{automobile.year}</td>
                                        <td>{automobile.model.name}</td>
                                        <td>{automobile.model.manufacturer.name}</td>
                                    </tr>
                                );
                            }
                        }
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}
export default AutomobileList
